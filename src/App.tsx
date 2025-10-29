import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingWizard } from './pages/OnboardingWizard';
import { Complete } from './pages/Complete';
import { Dashboard } from './pages/Dashboard';
import { ProfilePreview } from './pages/ProfilePreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preview" element={<ProfilePreview />} />
      </Routes>
    </Router>
  );
}

export default App;
