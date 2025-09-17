import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import { BookOpen } from 'lucide-react';

// Sample book data for demonstration
const sampleBooks = [
  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    authors: ["Robert C. Martin"],
    coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0132350882.01.L.jpg",
    publisher: ["Prentice Hall"],
    firstPublishYear: 2008,
    languages: ["eng"]
  },
  {
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    authors: ["David Thomas", "Andrew Hunt"],
    publisher: ["Addison-Wesley Professional"],
    firstPublishYear: 1999,
    languages: ["eng"]
  },
  {
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    authors: ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"],
    publisher: ["Addison-Wesley Professional"],
    firstPublishYear: 1994,
    languages: ["eng", "ger", "fra"]
  },
  {
    title: "JavaScript: The Good Parts",
    authors: ["Douglas Crockford"],
    coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0596517742.01.L.jpg",
    publisher: ["O'Reilly Media"],
    firstPublishYear: 2008,
    languages: ["eng"]
  }
];

const Index = () => {
  const [searchResults, setSearchResults] = useState(sampleBooks);
  const [currentSearch, setCurrentSearch] = useState<{ field: string; query: string } | null>(null);

  const handleSearch = (payload: { field: string; query: string }) => {
    setCurrentSearch(payload);
    console.log('Search performed:', payload);
    
    // Filter sample books based on search (simple demo implementation)
    const filtered = sampleBooks.filter(book => {
      const searchTerm = payload.query.toLowerCase();
      switch (payload.field) {
        case 'title':
          return book.title.toLowerCase().includes(searchTerm);
        case 'author':
          return book.authors.some(author => author.toLowerCase().includes(searchTerm));
        case 'publisher':
          return book.publisher.some(pub => pub.toLowerCase().includes(searchTerm));
        case 'published_year':
          return book.firstPublishYear?.toString().includes(searchTerm);
        case 'language':
          return book.languages.some(lang => lang.toLowerCase().includes(searchTerm));
        default:
          return true;
      }
    });
    
    setSearchResults(filtered);
  };

  const handleClear = () => {
    setCurrentSearch(null);
    setSearchResults(sampleBooks);
    console.log('Search cleared');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-library-gradient text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-3xl sm:text-4xl font-bold">Library Search</h1>
          </div>
          <p className="text-lg opacity-90">
            Discover your next favorite book from our extensive collection
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Search Bar */}
        <section>
          <SearchBar
            initialField="title"
            onSearch={handleSearch}
            onClear={handleClear}
          />
        </section>

        {/* Search Results */}
        <section>
          {currentSearch && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Search Results for "{currentSearch.query}" in {currentSearch.field}
              </h2>
              <p className="text-muted-foreground">
                Found {searchResults.length} book{searchResults.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {!currentSearch && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">Featured Books</h2>
              <p className="text-muted-foreground">Explore our recommended collection</p>
            </div>
          )}

          <div className="grid gap-4">
            {searchResults.length > 0 ? (
              searchResults.map((book, index) => (
                <BookCard
                  key={index}
                  title={book.title}
                  authors={book.authors}
                  coverUrl={book.coverUrl}
                  publisher={book.publisher}
                  firstPublishYear={book.firstPublishYear}
                  languages={book.languages}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No books found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse our featured collection
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Example Usage Documentation */}
        <section className="mt-12 p-6 bg-card rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">Component Usage Example</h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">SearchBar Component:</h4>
              <pre className="bg-muted p-3 rounded text-muted-foreground overflow-x-auto">
{`<SearchBar
  initialField="title"
  onSearch={({field, query}) => {
    fetch(\`https://openlibrary.org/search.json?\${field}=\${encodeURIComponent(query)}&page=1\`)
      .then(res => res.json())
      .then(data => setResults(data.docs));
  }}
  onClear={() => setResults([])}
/>`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium text-card-foreground mb-2">BookCard Component:</h4>
              <pre className="bg-muted p-3 rounded text-muted-foreground overflow-x-auto">
{`<BookCard
  title="Clean Code"
  authors={["Robert C. Martin"]}
  coverUrl="https://covers.openlibrary.org/b/id/12345-M.jpg"
  publisher={["Prentice Hall"]}
  firstPublishYear={2008}
  languages={["eng"]}
/>`}
              </pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;