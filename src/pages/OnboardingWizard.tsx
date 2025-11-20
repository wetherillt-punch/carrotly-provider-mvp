import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // This component is not actually used in the new flow
  // Redirecting to the new onboarding
  useState(() => {
    navigate('/onboarding');
  });

  return <div>Redirecting...</div>;
}
