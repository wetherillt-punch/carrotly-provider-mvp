import React from 'react';
import FindrLogo from './FindrLogo';

interface FindrHeaderProps {
  subtitle?: string;
  showLogo?: boolean;
}

export default function FindrHeader({ subtitle = 'Provider Onboarding', showLogo = true }: FindrHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showLogo && <FindrLogo size="sm" showText={true} />}
          {subtitle && (
            <div className="border-l border-gray-300 pl-4">
              <p className="text-sm font-medium text-gray-600">{subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
