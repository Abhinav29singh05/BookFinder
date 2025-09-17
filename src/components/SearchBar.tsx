import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';

// Search field type definition
type SearchField = 'q' | 'title' | 'author' | 'isbn' | 'publisher' | 'subject' | 'language' | 'published_year';

interface SearchBarProps {
  /** Initial search field selection */
  initialField?: SearchField;
  /** Initial query text */
  initialQuery?: string;
  /** Callback fired when search is performed */
  onSearch: (payload: { field: SearchField; query: string }) => void;
  /** Optional callback fired when clear button is clicked */
  onClear?: () => void;
}

// Field options with labels and placeholder text
const SEARCH_FIELDS = [
  { value: 'q' as const, label: 'General search', placeholder: 'General search' },
  { value: 'title' as const, label: 'Title', placeholder: 'Search by title' },
  { value: 'author' as const, label: 'Author', placeholder: 'Search by author name' },
  { value: 'isbn' as const, label: 'ISBN', placeholder: 'Search by ISBN' },
  { value: 'publisher' as const, label: 'Publisher', placeholder: 'Search by publisher' },
  { value: 'subject' as const, label: 'Genre', placeholder: 'Search by genre/subject' },
  { value: 'person' as const, label: 'Person mentioned', placeholder: 'Search by Person mentioned (e.g., Einstein)' },
  { value: 'place' as const, label: 'Place mentioned', placeholder: 'Search by place mentioned (e.g., Paris)' },
];

/**
 * SearchBar component for library book search
 * 
 * Features:
 * - Dropdown to select search field
 * - Text input for search query
 * - Search and Clear buttons
 * - Enter key support for search
 * - Dynamic placeholder text based on selected field
 */
const SearchBar: React.FC<SearchBarProps> = ({
  initialField = 'q',
  initialQuery = '',
  onSearch,
  onClear
}) => {
  const [selectedField, setSelectedField] = useState<SearchField>(initialField);
  const [query, setQuery] = useState(initialQuery);

  // Get current field configuration
  const currentField = SEARCH_FIELDS.find(field => field.value === selectedField) || SEARCH_FIELDS[0];

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch({ field: selectedField, query: trimmedQuery });
    }
  };

  const handleClear = () => {
    setSelectedField('q');
    setQuery('');
    onClear?.();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-blue ">
      <div className="flex flex-col sm:flex-row gap-3 p-4 bg-card rounded-lg shadow-search  border-2 border-black-200">
        {/* Field Selector */}
        <div className="sm:w-48 border-2 border-black-200 ">
          <Select value={selectedField} onValueChange={(value: SearchField) => setSelectedField(value)}>
            <SelectTrigger 
              className="w-full bg-background"
              aria-label="Select search field"
            >
              <SelectValue placeholder="Search by..." />
            </SelectTrigger>
            <SelectContent className="bg-card border-border border-2 border-blue-300">
              {SEARCH_FIELDS.map((field) => (
                <SelectItem 
                  key={field.value} 
                  value={field.value}
                  className="hover:bg-accent focus:bg-accent"
                >
                  {field.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="flex-1 border-2 border-black-200">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentField.placeholder}
            className="w-full bg-background "
            aria-label={`Search query for ${currentField.label.toLowerCase()}`}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:flex-shrink-0 ">
          <Button 
            onClick={handleSearch}
            disabled={!query.trim()}
            className="bg-library-gradient hover:opacity-90 text-primary-foreground px-6"
            aria-label="Search books"
          >
            <Search className="w-4 h-4 " />
              Search
            </Button>
          
          <Button 
            variant="outline" 
            onClick={handleClear}
            className="border-border hover:bg-accent"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;