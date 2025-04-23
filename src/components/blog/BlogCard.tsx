
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  image?: string;
}

const BlogCard: React.FC<BlogPostProps> = ({ id, title, excerpt, date, category, slug, image }) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg">
      <Link to={`/blog/${slug}`}>
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-esejfy-dark-secondary text-white text-opacity-20">
              <span className="text-4xl font-bold">eSEJFY</span>
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="flex-grow pt-6">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className="text-xs font-medium">
            {category}
          </Badge>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        
        <Link to={`/blog/${slug}`} className="block mb-2 hover:text-esejfy-burgundy transition-colors">
          <h3 className="text-xl font-bold">{title}</h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Link 
          to={`/blog/${slug}`} 
          className="text-esejfy-burgundy hover:text-esejfy-burgundy/80 text-sm font-medium animated-underline"
        >
          Číst více
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
