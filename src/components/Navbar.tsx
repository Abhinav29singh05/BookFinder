import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-[#DE8F5F] text-primary-foreground py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-8 h-8" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Library Search</h1>
        </div>
        <p className="text-lg opacity-90">
          Discover your next favorite book from our extensive collection
        </p>
      </div>
    </header>
  );
}