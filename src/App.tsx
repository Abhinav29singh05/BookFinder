import './App.css';
import Navbar from './components/Navbar';
import { SearchProvider, useBookSearch } from './hooks/useSearch';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/Result";
// import BookDetail from './components/BookDetail'; // keep for later if needed

const queryClient = new QueryClient();

// Extracted MainPage logic directly here
const MainContent = () => {
  const { setFilters, reset } = useBookSearch();

  const handleSearch = ({ field, query }: { field: string; query: string }) => {
    setFilters({ [field]: query } as any);
  };

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
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Navbar />
      <SearchProvider>
        <MainContent />
        {/* 
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/book/*" element={<BookDetail />} />
        </Routes>
        */}
      </SearchProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
