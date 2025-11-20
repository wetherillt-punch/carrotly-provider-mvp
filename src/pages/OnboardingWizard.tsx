import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FindrHeader from '../components/branding/FindrHeader';
import ProgressBar from '../components/branding/ProgressBar';
import { StepBasics } from '../components/onboarding/StepBasics';
import { StepLocation } from '../components/onboarding/StepLocation';
import { StepPhotos } from '../components/onboarding/StepPhotos';
import { StepServices } from '../components/onboarding/StepServices';
import { StepOptionalDetails } from '../components/onboarding/StepOptionalDetails';
import { StepReview } from '../components/onboarding/StepReview';
import { StepAgreement } from '../components/onboarding/StepAgreement';

export function OnboardingWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>(() => {
    const saved = localStorage.getItem('onboardingData');
    return saved ? JSON.parse(saved) : {};
  });

  const steps = [
    { id: 1, name: 'The Basics', component: StepBasics },
    { id: 2, name: 'Location', component: StepLocation },
    { id: 3, name: 'Photos', component: StepPhotos },
    { id: 4, name: 'Services', component: StepServices },
    { id: 5, name: 'Optional Details', component: StepOptionalDetails },
    { id: 6, name: 'Review', component: StepReview },
    { id: 7, name: 'Agreement', component: StepAgreement },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleNext = (data: any) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    
    // Save to localStorage, but exclude photos (too large)
    const dataToSave = { ...updatedData };
    if (dataToSave.photos) {
      // Only save photo count, not actual base64 data
      dataToSave.photoCount = dataToSave.photos.gallery?.length || 0;
      delete dataToSave.photos; // Don't store photos in localStorage
    }
    
    try {
      localStorage.setItem('onboardingData', JSON.stringify(dataToSave));
    } catch (error) {
      console.warn('Could not save to localStorage:', error);
      // Continue anyway - not critical
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/complete');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <FindrHeader subtitle="Provider Onboarding" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={steps.length} 
          stepName={steps[currentStep - 1].name}
        />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <CurrentStepComponent
            data={formData}
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={currentStep === 1}
          />
        </div>
      </div>
    </div>
  );
}

export default OnboardingWizard;

// Clear old data on mount if it's too large
try {
  const saved = localStorage.getItem('onboardingData');
  if (saved && saved.length > 1000000) { // > 1MB
    console.log('Clearing old localStorage data...');
    localStorage.removeItem('onboardingData');
  }
} catch (e) {
  localStorage.removeItem('onboardingData');
}

// Clear old data on mount if it's too large
try {
  const saved = localStorage.getItem('onboardingData');
  if (saved && saved.length > 1000000) { // > 1MB
    console.log('Clearing old localStorage data...');
    localStorage.removeItem('onboardingData');
  }
} catch (e) {
  localStorage.removeItem('onboardingData');
}
