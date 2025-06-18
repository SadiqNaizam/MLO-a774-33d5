import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock } from 'lucide-react';

interface ArticleListItemProps {
  article: {
    id: string | number;
    title: string;
    slug: string; // For constructing the link, e.g., /articles/{slug}
    excerpt: string;
    imageUrl?: string;
    category?: string;
    authorName?: string;
    publishDate?: string; // Consider formatting this date
    readingTime?: string; // e.g., "5 min read"
  };
}

const ArticleListItem: React.FC<ArticleListItemProps> = ({ article }) => {
  console.log("Rendering ArticleListItem:", article.title);

  // Fallback image if imageUrl is not provided or fails to load
  const placeholderImage = "/placeholder.svg"; // Ensure this exists in your public folder

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col md:flex-row">
      {article.imageUrl && (
        <div className="md:w-1/3">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Link to={`/articles/${article.slug}`} aria-label={`Read more about ${article.title}`}>
              <img
                src={article.imageUrl}
                alt={article.title}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderImage;
                }}
              />
            </Link>
          </AspectRatio>
        </div>
      )}
      <div className={`p-6 flex flex-col ${article.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
        <CardHeader className="p-0 mb-2">
          {article.category && (
            <Link to={`/category/${article.category.toLowerCase()}`} className="mb-1">
                <Badge variant="outline" className="hover:bg-accent">{article.category}</Badge>
            </Link>
          )}
          <CardTitle className="text-xl hover:text-primary">
            <Link to={`/articles/${article.slug}`}>{article.title}</Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mb-4 flex-grow">
          <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
        </CardContent>
        <CardFooter className="p-0 text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
          {article.authorName && <span>By {article.authorName}</span>}
          {article.publishDate && (
            <span className="flex items-center">
              <CalendarDays className="mr-1 h-3 w-3" />
              {article.publishDate}
            </span>
          )}
          {article.readingTime && (
             <span className="flex items-center">
               <Clock className="mr-1 h-3 w-3" />
               {article.readingTime}
             </span>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default ArticleListItem;