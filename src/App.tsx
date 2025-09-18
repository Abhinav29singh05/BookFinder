import './App.css';
import Navbar from './components/Navbar';
import { SearchProvider, useBookSearch } from './hooks/useSearch';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import Results from "@/components/Result";
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
// import BookDetails2 from './components/BookDetail';
import BookDetail from './components/BookDetail';

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
    <div className="">
      <Navbar/>
      <SearchBar
        initialField="title"
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
        <BrowserRouter>
          
            {/* <MainContent /> */}
            
            <SearchProvider>
            <Routes>
              <Route path="/" element={<MainContent />} />
            </Routes>
          </SearchProvider>

          <Routes>
            {/* <Route path="/book/:id" element={<BookDetail />} /> */}
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
