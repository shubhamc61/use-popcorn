import React, { useState } from 'react';
import Star from './Star';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const startContainerStyle = {
  display: 'flex',
  gap: '4px',
};

interface StartRatingProps {
  maxRating?: number;
  color?: string;
  size?: number;
  className?: string;
  defaultRating?: number;
  onSetRating?: (rating: number) => void;
}
export default function StarRating({
  maxRating = 10,
  color = '#FCC419',
  size = 48,
  className,
  onSetRating,
  defaultRating = 0,
}: StartRatingProps) {
  const [rating, setRating] = useState<number>(defaultRating);
  const [tempRating, setTempRating] = useState<number>(0);

  const handleRating = (rating: number) => {
    setRating(rating);

    onSetRating?.(rating);
  };

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size}px`,
  };
  return (
    <div style={containerStyle} className={className}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span style={textStyle}>
            <Star
              color={color}
              size={size}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              key={i}
              onClick={() => handleRating(i + 1)}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(rating)}
            />
          </span>
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ''}</p>
    </div>
  );
}
