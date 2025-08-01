import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  coverColor?: string;
  viewMode?: 'grid' | 'list';
}

const BookCard: React.FC<BookCardProps> = ({ 
  id,
  title, 
  author, 
  category, 
  rating, 
  coverColor = '#C4C4C4',
  viewMode = 'grid'
}) => {
  // List view layout
  if (viewMode === 'list') {
    return (
      <div 
        className="w-full h-32 rounded-2xl flex relative shadow-lg transition-all duration-300 hover:shadow-xl"
        style={{ backgroundColor: '#D9D9D9' }}
      >
        {/* Book Cover Area */}
        <div 
          className="w-24 rounded-l-2xl flex-shrink-0"
          style={{ backgroundColor: coverColor }}
        />
        
        {/* Book Details */}
        <div className="flex-1 p-4 flex items-center justify-between">
          <div className="flex-1">
            {/* Book Title and Author */}
            <h3 
              className="font-bold text-lg mb-1 leading-tight"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#000000'
              }}
            >
              {title}
            </h3>
            <p 
              className="text-gray-600 mb-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {author}
            </p>
            
            {/* Star Rating */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < rating ? 'fill-current' : 'fill-none'}
                  style={{ color: '#FFD900' }}
                />
              ))}
            </div>
          </div>
          
          {/* Category Tag and Button */}
          <div className="flex flex-col items-end gap-2">
            <span 
              className="text-xs px-3 py-1 rounded-full border border-gray-400"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                backgroundColor: 'transparent'
              }}
            >
              {category}
            </span>
            <Link to={`/book/${id}`}>
            <button 
              className="px-4 py-1 rounded-lg font-semibold text-black text-sm transition-all duration-200 hover:shadow-md"
              style={{ 
                backgroundColor: '#FFD900',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Learn more
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid view layout (default)
  return (
    <div 
      className="w-full max-w-md h-64 rounded-3xl flex relative shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
      style={{ backgroundColor: '#D9D9D9' }}
    >
      {/* Book Cover Area */}
      <div 
        className="w-2/5 rounded-l-3xl"
        style={{ backgroundColor: coverColor }}
      />
      
      {/* Book Details */}
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
        <div className="mt-2">
          {/* Category Tag */}
          <div className="absolute top-3 right-3">
            <span 
              className="text-xs px-3 py-1 rounded-full border border-gray-400"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                backgroundColor: 'transparent'
              }}
            >
              {category}
            </span>
          </div>
          
          {/* Book Title and Author */}
          <div className="mt-6">
            <h3 
              className="font-bold text-lg md:text-xl mb-3 leading-tight"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: '#000000'
              }}
            >
              {title}
            </h3>
            <p 
              className="text-gray-600 mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {author}
            </p>
          </div>
          
          {/* Star Rating */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < rating ? 'fill-current' : 'fill-none'}
                style={{ color: '#FFD900' }}
              />
            ))}
          </div>
        </div>
        
        {/* Learn More Button */}
         <Link to={`/book/${id}`}>
        <button 
          className="px-6 py-2 rounded-lg font-semibold text-black text-sm self-start transition-all duration-200 hover:shadow-md hover:scale-105"
          style={{ 
            backgroundColor: '#FFD900',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Learn more
        </button>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;