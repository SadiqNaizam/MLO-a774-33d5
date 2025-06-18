import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react'; // Using StarOff for empty or if needed
import { cn } from '@/lib/utils'; // For conditional class names

interface StarRatingDisplayProps {
  rating: number; // e.g., 3.5
  maxStars?: number; // Default 5
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Icon size
  className?: string;
  showTooltip?: boolean; // Whether to show a tooltip with the rating number
}

const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  className,
  showTooltip = true,
}) => {
  console.log("Rendering StarRatingDisplay for rating:", rating);

  const validRating = Math.max(0, Math.min(rating, maxStars));

  const starSizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7',
  };

  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= validRating) {
      stars.push(<Star key={`full-${i}`} className={cn("fill-yellow-400 text-yellow-400", starSizeClasses[size])} />);
    } else if (i - 0.5 <= validRating) {
      stars.push(<StarHalf key={`half-${i}`} className={cn("fill-yellow-400 text-yellow-400", starSizeClasses[size])} />);
    } else {
      stars.push(<Star key={`empty-${i}`} className={cn("text-gray-300", starSizeClasses[size])} />);
    }
  }

  return (
    <div
      className={cn("flex items-center space-x-0.5", className)}
      title={showTooltip ? `${validRating.toFixed(1)} out of ${maxStars} stars` : undefined}
    >
      {stars}
    </div>
  );
};

export default StarRatingDisplay;