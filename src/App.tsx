import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SearchBusiness from './pages/onboarding/SearchBusiness';
import SearchResults from './pages/onboarding/SearchResults';
import VerifyOwnership from './pages/onboarding/VerifyOwnership';
import CompleteProfile from './pages/onboarding/CompleteProfile';
import ContactAdmin from './pages/onboarding/ContactAdmin';
import Complete from './pages/Complete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<SearchBusiness />} />
        <Route path="/onboarding/search-results" element={<SearchResults />} />
        <Route path="/onboarding/verify" element={<VerifyOwnership />} />
        <Route path="/onboarding/complete-profile" element={<CompleteProfile />} />
        <Route path="/onboarding/contact-admin" element={<ContactAdmin />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
