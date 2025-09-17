import React from "react";
import BookCard from "@/components/BookCard";
import { useBookSearch } from "@/hooks/useSearch";


function coverFromCoverI(cover_i?: number) {
  return cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : undefined;
}


export default function Results() {
  // const results = sampleBooks;
  // const loading = false;
  // const error = null;
  // const hasMore = false;
  const { results, loading, error, loadMore, hasMore } = useBookSearch();

  return (
    <div className="space-y-6 p-4">
      {error && (
        <div className="text-destructive text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          Error: {error}
        </div>
      )}
      
      {results.length === 0 && !loading && (
        <div className="text-muted-foreground text-center p-8">
          No results yet — try a search.
        </div>
      )}
      
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {results.map((doc) => {
          // console.log(doc);
          const coverUrl= coverFromCoverI(doc.cover_i);
          
          return (
            <BookCard
              key={doc.key}
              title={doc.title}
              authors={doc.author_name}
              coverUrl={coverUrl}
              publisher={doc.publisher}
              firstPublishYear={doc.first_publish_year}
              languages={doc.language}
            />
          );
        })}
      </div>
      
      {loading && (
        <div className="text-center p-4 text-muted-foreground">
          Loading…
        </div>
      )}


      {/* Load more button */}
      {!loading && hasMore && results.length > 0 && (
        <div className="text-center p-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 rounded bg-primary text-white hover:opacity-95"
          >
            Load more
          </button>
        </div>
      )}
      
      {!hasMore && results.length > 0 && (
        <div className="text-muted-foreground text-center p-4">
          End of results
        </div>
      )}
    </div>
  );
}