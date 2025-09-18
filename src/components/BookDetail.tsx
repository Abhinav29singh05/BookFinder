import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Book, Calendar, Users, Globe, BookOpen, Link, Clock, Edit } from 'lucide-react';
import { useLocation } from "react-router-dom";

interface BookApiResponse {
  title?: string;
  description?: string | { value: string };
  authors?: Array<{ author?: { key: string }; name?: string }>;
  created?: { type: string; value: string };
  first_publish_date?: string;
  last_modified?: { type: string; value: string };
  latest_revision?: number;
  key?: string;
  covers?: number[];
  subjects?: string[];
}



export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const state = location.state as { authors?: string[] } | null;

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://openlibrary.org/works/${id}.json`);
        
        if (!response.ok) {
          throw new Error('Book not found');
        }
        
        const data: BookApiResponse = await response.json();
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // useEffect(() => {
  //   if (state?.authors) {
  //     console.log("📚 Authors from Card:", state.authors);
  //   } else {
  //     console.log("❌ No authors found in state");
  //   }
  // }, [state]);


  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-[#FFC29B]">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center bg-[#FFECC0]">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
            <h2 className="text-xl font-semibold mb-2 ">Loading Book Details...</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center bg-[#FFC29B]">
        <Card className="w-full max-w-md bg-[#DE8F5F]">
          <CardContent className="p-6 text-center bg-[#FFECC0]">
            <h2 className="text-xl font-semibold mb-2">Book Not Found</h2>
            <p className="text-muted-foreground mb-4">{error || "The book you're looking for doesn't exist."}</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2 " />
              Back to Library
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format description
 const getDescription = (desc: string | { value: string } | undefined) => {
    if (!desc) return null;

    // Extract actual text
    const text = typeof desc === "string" ? desc : desc.value;

    // Cut off everything starting from "([source"
    const cleanText = text.split("([source")[0].trim();

    return cleanText;
  };

  // Format date
  const formatDate = (dateObj: { type: string; value: string } | undefined) => {
    if (!dateObj) return null;
    return new Date(dateObj.value).toLocaleDateString();
  };

  // Get cover URL
  const getCoverUrl = (covers: number[] | undefined) => {
    if (!covers || covers.length === 0) return null;
    return `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`;
  };

  const coverUrl = getCoverUrl(book.covers) || `https://via.placeholder.com/300x450/f5f5f0/8b8680?text=No+Cover`;
  const description = getDescription(book.description);

  const authors =
    state?.authors ||
    book.authors?.map((a) => a.name || a.author?.key).filter(Boolean) ||
    [];

    console

  return (
    <div className="min-h-screen bg-[#FFC29B] ">
      {/* Header with back button */}
      <header className="bg-card border-b border-border ">
        <div className=" mx-auto px-4 py-4  bg-[#DE8F5F] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-2 bg-background bg-[#FFC29B]"
          >
            <ArrowLeft className="w-4 h-4 mr-2 " />
            Back to Library
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Book Details</h1>
          </div>
        </div>
      </header>

      {/* Book details */}
      <main className="max-w-6xl mx-auto  py-8  ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book cover */}
          <div className="lg:col-span-1 ">
            <Card className=' bg-[#FFECC0]'>
              <CardContent className="p-6 ">
                <div className="w-full max-w-sm mx-auto">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted border border-border">
                    <img
                      src={coverUrl}
                      alt={`Cover of ${book.title || 'Book'}`}
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
          <div className="lg:col-span-2 space-y-6 ">
            {/* Title and basic info */}
            <Card className=' bg-[#FFECC0]'>
              <CardHeader>
                <CardTitle className="text-3xl">{book.title || 'Untitled'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Authors */}
                {authors.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex flex-col items-start">
                      <p className="font-medium">Authors</p>
                      <p className="text-muted-foreground">{authors.join(', ')}</p>
                    </div>
                  </div>
                )}

                {/* First Publish Date */}
                {book.first_publish_date && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className='flex flex-col items-start'>
                      <p className="font-medium">First Published</p>
                      <p className="text-muted-foreground">{book.first_publish_date}</p>
                    </div>
                  </div>
                )}

                {/* OpenLibrary Link */}
                {book.key && (
                  <div className="flex items-start gap-3 ">
                    <Link className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className='flex flex-col items-start'>
                      <p className="font-medium">Open Library Link</p>
                      <a 
                        href={`https://openlibrary.org${book.key}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        https://openlibrary.org{book.key}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {description && (
              <Card className=' bg-[#FFECC0]'>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-left">{description}</p>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card className=' bg-[#FFECC0]'>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {book.created && (
                  <div className="flex justify-between">
                    <span className="font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Created:
                    </span>
                    <span className="text-muted-foreground">{formatDate(book.created)}</span>
                  </div>
                )}
                
                {book.last_modified && (
                  <div className="flex justify-between">
                    <span className="font-medium flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Last Modified:
                    </span>
                    <span className="text-muted-foreground">{formatDate(book.last_modified)}</span>
                  </div>
                )}
                
                {book.latest_revision && (
                  <div className="flex justify-between">
                    <span className="font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Latest Revision:
                    </span>
                    <span className="text-muted-foreground">{book.latest_revision}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subjects/Genres */}
            {book.subjects && book.subjects.length > 0 && (
              <Card className=' bg-[#FFECC0]'>
                <CardHeader>
                  <CardTitle>Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {book.subjects.slice(0, 10).map((subject, index) => (
                      <Badge key={index} variant="outline" className=' bg-[#ffd574]'>
                        {subject}
                      </Badge>
                    ))}
                    {book.subjects.length > 10 && (
                      <Badge variant="secondary">+{book.subjects.length - 10} more</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}