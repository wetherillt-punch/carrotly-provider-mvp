import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../components/common';
import { StepBusinessLookup } from '../components/onboarding/StepBusinessLookup';
import { StepBasics } from '../components/onboarding/StepBasics';
import { StepLocation } from '../components/onboarding/StepLocation';
import { StepPhotos } from '../components/onboarding/StepPhotos';
import { StepServices } from '../components/onboarding/StepServices';
import { StepOptionalDetails } from '../components/onboarding/StepOptionalDetails';
import { StepReview } from '../components/onboarding/StepReview';
import { useProviderData } from '../hooks/useProviderData';

export const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const { provider, updateProvider } = useProviderData();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(provider || {});

  const steps = [
    'Find Business',
    'The Basics',
    'Location',
    'Photos',
    'Services',
    'Optional Info',
    'Review'
  ];

  // Save to localStorage whenever form data changes
  useEffect(() => {
    updateProvider(formData);
  }, [formData]);

  const handleNext = (data: any) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final submit
      handleSubmit(updatedData);
    }
  };

  const handleSkipLookup = () => {
    // Skip business lookup, go straight to manual entry
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (data: any) => {
    // Add metadata
    const completeData = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    // Save to localStorage
    updateProvider(completeData);
    
    // Navigate to completion page
    navigate('/complete');
  };

  const renderStep = () => {
    const stepProps = {
      data: formData,
      onNext: handleNext,
      onBack: handleBack,
    };

    switch (currentStep) {
      case 0:
        return <StepBusinessLookup onNext={handleNext} onSkip={handleSkipLookup} />;
      case 1:
        return <StepBasics {...stepProps} />;
      case 2:
        return <StepLocation {...stepProps} />;
      case 3:
        return <StepPhotos {...stepProps} />;
      case 4:
        return <StepServices {...stepProps} />;
      case 5:
        return <StepOptionalDetails {...stepProps} />;
      case 6:
        return <StepReview {...stepProps} onNext={() => handleNext({})} />;
      default:
        return <StepBusinessLookup onNext={handleNext} onSkip={handleSkipLookup} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-xl font-bold">🥕</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Carrotly Provider Portal</h1>
                <p className="text-sm text-gray-600">Provider Onboarding</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar
            currentStep={currentStep + 1}
            totalSteps={7}
            steps={steps}
          />
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderStep()}
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Contact support</a>
          </p>
        </div>
      </main>
    </div>
  );
};
