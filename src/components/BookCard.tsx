import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Calendar, Users, Globe } from 'lucide-react';
import { InfoDialog } from './InfoDialog';

interface BookCardProps {
  bookKey: string;
  /** Book title */
  title: string;
  /** Array of author names (optional) */
  authors?: string[];
  /** URL for book cover image (optional) */
  coverUrl?: string;
  /** Array of publisher names (optional) */
  publisher?: string[];
  /** Year of first publication (optional) */
  firstPublishYear?: number;
  /** Array of language codes (optional) */
  languages?: string[];
}


 

const BookCard: React.FC<BookCardProps> = ({
  bookKey,
  title,
  authors = [],
  coverUrl,
  publisher = [],
  firstPublishYear,
  languages = []
}) => {

  const navigate = useNavigate();

  // placeholder image url if no url found
  const imageUrl = coverUrl || `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwpengine.com%2Fresources%2Foptimize-images-for-web%2F&psig=AOvVaw3hcLDf3cRzN0sCyNPkLSRU&ust=1758130337779000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCZ-5bo3Y8DFQAAAAAdAAAAABAE`;


  const handleClick = () => {
    const cleanKey = bookKey.replace("/works/", ""); // remove prefix
    navigate(`/book/${cleanKey}`, {
      state: {
        authors: authors || []   // <-- explicitly pass the authors array of strings
      }
    });
  };



  return (
    <Card className="  w-full hover:shadow-card-hover transition-shadow duration-200 bg-card border-border  bg-[#FFECC0]" >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {/* Book Cover */}
          <div className="flex-shrink-0 self-start cursor-pointer " onClick={handleClick}>
            <div className="w-24 h-36 sm:w-30 sm:h-50 rounded-md overflow-hidden bg-muted border border-border">
              <img
                src={imageUrl}
                alt={`Cover of ${title}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwpengine.com%2Fresources%2Foptimize-images-for-web%2F&psig=AOvVaw3hcLDf3cRzN0sCyNPkLSRU&ust=1758130337779000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCZ-5bo3Y8DFQAAAAAdAAAAABAE`;
                }}
              />
            </div>
          </div>

          {/* Book Information */}
          <div className="flex-1 min-w-0 space-y-2 " >
            {/* Title */}
            <h3 className="font-semibold text-lg leading-tight text-card-foreground line-clamp-2  cursor-pointer" onClick={handleClick}>
              {title}
            </h3>

            {/* Authors */}
            {authors.length > 0 && (
              <div className="flex items-start gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  {authors.slice(0, 3).join(", ")}
                  {authors.length > 3 && (
                    <InfoDialog
                      title="All Authors"
                      items={authors}
                      trigger={
                        <Badge variant="outline" className="text-xs cursor-pointer bg-[#FFC29B]">
                           +{authors.length - 3}
                        </Badge>
                        // <button className="ml-1 text-blue-600 underline">
                        //   +{authors.length - 3} more
                        // </button>
                      }
                    />
                  )}
                </span>
              </div>
            )}

            {/* Publisher and Year */}
            <div className="flex flex-wrap gap-4 text-sm">
              {publisher.length > 0 && (
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {publisher.slice(0, 2).join(', ')}
                  </span>
                </div>
              )}

              {firstPublishYear && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{firstPublishYear}</span>
                </div>
              )}
            </div>

            {/* Languages */}
            {languages.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex gap-1 flex-wrap">
                  {languages.slice(0, 4).map((lang, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-secondary text-secondary-foreground "
                    >
                      {lang.toUpperCase()}
                    </Badge>
                  ))}
                  {languages.length > 4 && (
                    <InfoDialog
                      title="All Languages"
                      items={languages.map((l) => l.toUpperCase())}
                      trigger={
                        <Badge variant="outline" className="text-xs cursor-pointer bg-[#FFC29B]">
                          +{languages.length - 4}
                        </Badge>
                      }
                    />
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;