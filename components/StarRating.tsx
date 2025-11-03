import React from 'react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount, size = 'sm', showCount = true }) => {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const countSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span
            key={i}
            className="material-symbols-outlined text-[#ffc107]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span
            key={i}
            className="material-symbols-outlined text-[#ffc107]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star_half
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="material-symbols-outlined text-[#ffc107]">
            star
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-1">
      <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
        {renderStars()}
      </div>
      {showCount && reviewCount && (
        <span className={`${countSizeClasses[size]} text-[#45a185] dark:text-[#94c2b3] ml-1`}>
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
};

export default StarRating;