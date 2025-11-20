import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Phone, ArrowRight } from 'lucide-react';
import FindrLogo from '../../components/branding/FindrLogo';

interface SearchResult {
  placeId: string;
  name: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  photoReference?: string;
}

export default function SearchResults() {
  const navigate = useNavigate();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedResults = sessionStorage.getItem('searchResults');
    if (!savedResults) {
      navigate('/onboarding');
      return;
    }

    try {
      const parsed = JSON.parse(savedResults);
      setResults(parsed);
      setLoading(false);
    } catch (error) {
      console.error('Error loading results:', error);
      navigate('/onboarding');
    }
  }, [navigate]);

  const handleSelectBusiness = (result: SearchResult) => {
    sessionStorage.setItem('selectedPlace', JSON.stringify(result));
    navigate('/onboarding/verify');
  };

  const handleManualEntry = () => {
    navigate('/onboarding/manual');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <FindrLogo size="sm" showText={true} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Step 1 of 7: Find Business</span>
            <span className="text-sm font-medium text-teal-600">14%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full" style={{ width: '14%' }}></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Business</h2>
          <p className="text-gray-600 mb-8">
            We found {results.length} matching businesses. Select yours to continue.
          </p>

          {/* Results List */}
          <div className="space-y-4 mb-8">
            {results.map((result) => (
              <button
                key={result.placeId}
                onClick={() => handleSelectBusiness(result)}
                className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Photo or Placeholder */}
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                    {result.photoReference ? (
                      <img
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${result.photoReference}&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`}
                        alt={result.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <MapPin className="w-8 h-8 text-teal-600" />
                    )}
                  </div>

                  {/* Business Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition">
                      {result.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{result.address}</span>
                    </div>

                    {result.rating && (
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-gray-900">{result.rating}</span>
                        {result.userRatingsTotal && (
                          <span className="text-gray-500">({result.userRatingsTotal} reviews)</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-teal-600 transition flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>

          {/* Not Found Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-3">Can't find your business?</p>
            <button
              onClick={handleManualEntry}
              className="text-teal-600 font-semibold hover:text-teal-700 hover:underline"
            >
              Enter information manually →
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/onboarding')}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back to search
          </button>
        </div>
      </div>
    </div>
  );
}
