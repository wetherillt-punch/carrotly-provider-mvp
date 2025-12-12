import React from 'react';

interface FindrLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function FindrLogo({ size = 'md', showText = true }: FindrLogoProps) {
  const sizes = {
    sm: 'h-10',
    md: 'h-16',
    lg: 'h-24',
    xl: 'h-40',
  };

  return (
    <div className="inline-flex items-center justify-center">
      {showText ? (
        <img 
          src="/findr-logo.svg" 
          alt="Findr Health" 
          className={`${sizes[size]} w-auto`}
        />
      ) : (
        <img 
          src="/findr-icon.svg" 
          alt="Findr" 
          className={`${sizes[size]} w-auto`}
        />
      )}
    </div>
  );
}
