import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SearchBusiness from './pages/onboarding/SearchBusiness';
import SearchResults from './pages/onboarding/SearchResults';
import VerifyOwnership from './pages/onboarding/VerifyOwnership';
import CompleteProfile from './pages/onboarding/CompleteProfile';
import ContactAdmin from './pages/onboarding/ContactAdmin';
import { Complete } from './pages/Complete';
import { Dashboard } from './pages/Dashboard';
import { ProfilePreview } from './pages/ProfilePreview';

function App() {
  return (
    <Router>
      <Routes>
        {/* Onboarding Flow */}
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<SearchBusiness />} />
        <Route path="/onboarding/search-results" element={<SearchResults />} />
        <Route path="/onboarding/verify" element={<VerifyOwnership />} />
        <Route path="/onboarding/complete-profile" element={<CompleteProfile />} />
        <Route path="/onboarding/contact-admin" element={<ContactAdmin />} />
        
        {/* Other Pages */}
        <Route path="/complete" element={<Complete />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preview" element={<ProfilePreview />} />
      </Routes>
    </Router>
  );
}

export default App;
