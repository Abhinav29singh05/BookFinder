import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Book, Calendar, Users, Globe, BookOpen } from 'lucide-react';

// Sample data - in real app, this would come from API
const sampleBooks = [
  {
    key: "1",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    authors: ["Robert C. Martin"],
    coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0132350882.01.L.jpg",
    publisher: ["Prentice Hall"],
    firstPublishYear: 2008,
    languages: ["eng"],
    description: "A comprehensive guide to writing clean, readable, and maintainable code. This book teaches developers how to write code that is easy to understand, modify, and extend.",
    pages: 464,
    isbn: "9780132350884",
    genres: ["Programming", "Software Engineering", "Technology"]
  },
  {
    key: "2",
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    authors: ["David Thomas", "Andrew Hunt"],
    publisher: ["Addison-Wesley Professional"],
    firstPublishYear: 1999,
    languages: ["eng"],
    description: "A practical guide to becoming a better programmer through tips, tricks, and best practices that have been proven in the real world.",
    pages: 352,
    isbn: "9780135957059",
    genres: ["Programming", "Software Development", "Career"]
  },
  {
    key: "3",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    authors: ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"],
    publisher: ["Addison-Wesley Professional"],
    firstPublishYear: 1994,
    languages: ["eng", "ger", "fra"],
    description: "The foundational text on object-oriented design patterns, presenting 23 patterns that solve common design problems.",
    pages: 395,
    isbn: "9780201633610",
    genres: ["Programming", "Object-Oriented Design", "Software Architecture"]
  },
  {
    key: "4",
    title: "JavaScript: The Good Parts",
    authors: ["Douglas Crockford"],
    coverUrl: "https://images-na.ssl-images-amazon.com/images/P/0596517742.01.L.jpg",
    publisher: ["O'Reilly Media"],
    firstPublishYear: 2008,
    languages: ["eng"],
    description: "An exploration of the beautiful, elegant, lightweight and highly expressive language that is JavaScript, focusing on the good parts.",
    pages: 176,
    isbn: "9780596517748",
    genres: ["JavaScript", "Web Development", "Programming"]
  }
];

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find book by key - in real app, you'd fetch from API using the id
  const book = sampleBooks.find(b => b.key === id);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Book Not Found</h2>
            <p className="text-muted-foreground mb-4">The book you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/library')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const imageUrl = book.coverUrl || `https://via.placeholder.com/300x450/f5f5f0/8b8680?text=No+Cover`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/library')}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Book Details</h1>
          </div>
        </div>
      </header>

      {/* Book details */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book cover */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="w-full max-w-sm mx-auto">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted border border-border">
                    <img
                      src={imageUrl}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/300x450/f5f5f0/8b8680?text=No+Cover`;
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and basic info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{book.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Authors */}
                {book.authors && book.authors.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Authors</p>
                      <p className="text-muted-foreground">{book.authors.join(', ')}</p>
                    </div>
                  </div>
                )}

                {/* Publisher and Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {book.publisher && book.publisher.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Book className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Publisher</p>
                        <p className="text-muted-foreground">{book.publisher.join(', ')}</p>
                      </div>
                    </div>
                  )}

                  {book.firstPublishYear && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Published</p>
                        <p className="text-muted-foreground">{book.firstPublishYear}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Languages */}
                {book.languages && book.languages.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Languages</p>
                      <div className="flex gap-2 flex-wrap mt-1">
                        {book.languages.map((lang, index) => (
                          <Badge key={index} variant="secondary">
                            {lang.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {book.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{book.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Additional details */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {book.isbn && (
                  <div className="flex justify-between">
                    <span className="font-medium">ISBN:</span>
                    <span className="text-muted-foreground">{book.isbn}</span>
                  </div>
                )}
                {book.pages && (
                  <div className="flex justify-between">
                    <span className="font-medium">Pages:</span>
                    <span className="text-muted-foreground">{book.pages}</span>
                  </div>
                )}
                {book.genres && book.genres.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Genres:</p>
                    <div className="flex gap-2 flex-wrap">
                      {book.genres.map((genre, index) => (
                        <Badge key={index} variant="outline">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}