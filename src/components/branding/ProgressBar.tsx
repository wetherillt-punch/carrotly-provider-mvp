import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepName: string;
}

export default function ProgressBar({ currentStep, totalSteps, stepName }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">
          Step {currentStep} of {totalSteps}: {stepName}
        </span>
        <span className="text-sm font-medium text-teal-600">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
