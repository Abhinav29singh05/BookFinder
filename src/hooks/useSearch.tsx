import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const API_BASE = "https://openlibrary.org/search.json";
const DEFAULT_LIMIT = 15;

export type SearchFilters = {
  key?:string;
  q?: string; // general search
  title?: string;
  author?: string;
  isbn?: string;
  publisher?: string;
  subject?: string; // genre
  language?: string;
  published_year?: string;
  person?: string;
  place?: string;
  page?: number; 
};

export type BookDoc = {
  key: string;
  title: string;
  author_name?: string[];
  author_key?: string[];
  first_publish_year?: number;
  publisher?: string[];
  language?: string[];
  cover_i?: number;
  edition_count?: number;
};

type SearchContextType = {
  filters: SearchFilters;
  setFilters: (f: SearchFilters) => void;
  results: BookDoc[];
  loading: boolean;
  error?: string;
  loadMore: () => void;
  hasMore: boolean;
  reset: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [results, setResults] = useState<BookDoc[]>([]);
  const [page, setPage] = useState(1);
  const [totalFound, setTotalFound] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>(undefined);

  // For debounce
  const debounceRef = useRef<number | null>(null);
  // track last applied filters so we can reset page when filters change
  const appliedFiltersRef = useRef<SearchFilters>({});

  // Build query string
  function buildUrl(filters: SearchFilters, pageNum: number) {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.title) params.set("title", filters.title);
    if (filters.author) params.set("author", filters.author);
    if (filters.isbn) params.set("isbn", filters.isbn);
    if (filters.publisher) params.set("publisher", filters.publisher);
    if (filters.subject) params.set("subject", filters.subject);
    if (filters.person) params.set("person", filters.person);
    if (filters.place) params.set("place", filters.place);
    params.set("page", String(pageNum));
    params.set("limit", String(DEFAULT_LIMIT));
    return `${API_BASE}?${params.toString()}`;
  }

  // fetch page (append if page>1; replace if page===1)
  async function fetchPage(filtersToUse: SearchFilters, pageNum: number) {
    setLoading(true);
    setError(undefined);
    try {
      const url = buildUrl(filtersToUse, pageNum);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const docs: BookDoc[] = data.docs || [];
      setTotalFound(typeof data.numFound === "number" ? data.numFound : null);
      if (pageNum === 1) {
        setResults(docs);
      } else {
        setResults(prev => [...prev, ...docs]);
      }
    } catch (e:any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  // Effect: when filters change, debounce and then reset page to 1 and fetch
  useEffect(() => {
    // compare with applied filters, if equal do nothing
    const areSame = JSON.stringify(filters) === JSON.stringify(appliedFiltersRef.current);
    if (areSame) return;

    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      appliedFiltersRef.current = { ...filters };
      setPage(1);
      fetchPage(filters, 1);
    }, 300); // 300ms debounce
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Effect: when page increases (load more) fetch that page with current filters
  useEffect(() => {
    // when page === 1 this is triggered by filters logic above; skip double-fetch
    if (page === 1) return;
    fetchPage(appliedFiltersRef.current, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function loadMore() {
    // if totalFound is known, don't fetch beyond available pages
    if (totalFound !== null && results.length >= totalFound) return;
    setPage(prev => prev + 1);
  }

  function reset() {
    setFilters({});
    setResults([]);
    setPage(1);
    setTotalFound(null);
    appliedFiltersRef.current = {};
  }

  return (
    <SearchContext.Provider value={{
      filters,
      setFilters,
      results,
      loading,
      error,
      loadMore,
      hasMore: totalFound === null ? true : results.length < totalFound,
      reset
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export function useBookSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useBookSearch must be used within SearchProvider");
  return ctx;
}
