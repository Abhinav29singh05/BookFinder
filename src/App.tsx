import './App.css'
import Navbar from './components/Navbar'
import { SearchProvider } from './hooks/useSearch'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from './mainPage'
import { Route, Routes } from 'react-router-dom';
import BookDetail from './components/BookDetail';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <Navbar/>
        <SearchProvider>
          {/* <Routes> */}
            <MainPage/>
            {/* <Route path="/" element={<MainPage />} /> */}
            {/* <Route path="/book/*" element={<BookDetail />} /> */}
          {/* </Routes> */}

        </SearchProvider>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
