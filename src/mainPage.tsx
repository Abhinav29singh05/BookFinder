import React from "react";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/Result";
import { useBookSearch } from "@/hooks/useSearch";

export default function MainPage() {
  // access setFilters & reset from context
  const { setFilters, reset } = useBookSearch();

  // Called when SearchBar triggers onSearch({ field, query })
  const handleSearch = ({ field, query }: { field: string; query: string }) => {
    // Build a filters object with only the chosen field set.
    // This will reset previous filters and trigger fetch page=1 in your hook.
    setFilters({ [field]: query } as any);
  };

  // Called when SearchBar triggers clear
  const handleClear = () => {
    reset();
  };

  return (
    <div className="p-4">
      <SearchBar
        initialField="q"
        initialQuery=""
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <Results />
    </div>
  );
}
