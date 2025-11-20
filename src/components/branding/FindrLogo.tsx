import React from 'react';

interface FindrLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function FindrLogo({ size = 'md', showText = true }: FindrLogoProps) {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  const textSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  };

  return (
    <div className="inline-flex flex-col items-center">
      {/* Findr Icon */}
      <div className={`${sizes[size]} mb-2 relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="findrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Teal diamond curves */}
          <path d="M 30 0 Q 50 20, 70 0 L 70 30 Q 50 10, 30 30 Z" fill="url(#findrGradient)" />
          <path d="M 100 30 Q 80 50, 100 70 L 70 70 Q 90 50, 70 30 Z" fill="url(#findrGradient)" />
          <path d="M 70 100 Q 50 80, 30 100 L 30 70 Q 50 90, 70 70 Z" fill="url(#findrGradient)" />
          <path d="M 0 70 Q 20 50, 0 30 L 30 30 Q 10 50, 30 70 Z" fill="url(#findrGradient)" />
        </svg>
      </div>
      
      {showText && (
        <div className="flex items-center gap-1">
          <span className={`${textSizes[size]} font-bold text-gray-900`}>
            findr
          </span>
          <span className="text-xs text-teal-600 font-semibold align-super">™</span>
        </div>
      )}
    </div>
  );
}
