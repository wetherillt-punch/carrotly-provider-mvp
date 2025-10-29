import React, { useState } from 'react';
import { Button } from '../common';
import { Search, MapPin, Star, Phone, Globe, ArrowRight, AlertCircle } from 'lucide-react';

interface BusinessResult {
  placeId: string;
  name: string;
  address: {
    street: string;
    suite: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  website: string;
  photos: Array<{ reference: string; url: string }>;
  rating: number;
  totalRatings: number;
  providerTypes: string[];
  hours: string[];
  location: { lat: number; lng: number };
}

interface StepBusinessLookupProps {
  onNext: (data: any) => void;
  onSkip: () => void;
}

export const StepBusinessLookup: React.FC<StepBusinessLookupProps> = ({ onNext, onSkip }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<BusinessResult[]>([]);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a business name or website');
      return;
    }

    setSearching(true);
    setError('');
    setHasSearched(true);

    try {
      // Use production API URL when deployed, localhost when developing
      const apiUrl = import.meta.env.PROD 
        ? '/api/search-business'
        : 'http://localhost:3001/api/search-business';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data.results || []);

      if (data.results.length === 0) {
        setError('No businesses found. Try a different search or enter manually.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search. Please try a different search or enter manually.');
    } finally {
      setSearching(false);
    }
  };

  const handleSelectBusiness = (business: BusinessResult) => {
    // Transform Google Places data to our form format
    const formData = {
      // Step 1: Basics
      practiceName: business.name,
      providerTypes: business.providerTypes,
      phone: business.phone,
      email: '', // Not available from Google
      
      // Step 2: Location
      address: {
        street: business.address.street,
        suite: business.address.suite,
        city: business.address.city,
        state: business.address.state,
        zip: business.address.zip,
      },
      website: business.website,
      
      // Step 3: Photos
      photos: {
        primary: business.photos[0]?.url || '',
        gallery: business.photos.map(p => p.url),
      },
      
      // Metadata
      googlePlaceId: business.placeId,
      location: business.location,
      preFilledFromGoogle: true,
    };

    onNext(formData);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Find Your Business</h2>
      
      <p className="text-gray-600 mb-6">
        Search for your business and we'll automatically fill in your information. 
        This saves you time!
      </p>

      {/* Search Box */}
      <div className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your business name (e.g., 'Smith Family Medicine Bozeman')"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
              disabled={searching}
            />
          </div>
          <Button
            variant="primary"
            onClick={handleSearch}
            disabled={searching || !searchQuery.trim()}
            className="px-8"
          >
            {searching ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {/* Example searches */}
        <div className="mt-3 text-sm text-gray-600">
          <span className="font-medium">Examples:</span>
          <button
            onClick={() => setSearchQuery('Bozeman Health Clinic')}
            className="ml-2 text-primary-600 hover:text-primary-700 underline"
          >
            "Bozeman Health Clinic"
          </button>
          <span className="mx-1">•</span>
          <button
            onClick={() => setSearchQuery('Mountain View Dental')}
            className="text-primary-600 hover:text-primary-700 underline"
          >
            "Mountain View Dental"
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-4">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </h3>
          
          <div className="space-y-4">
            {results.map((business) => (
              <div
                key={business.placeId}
                className="border-2 border-gray-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleSelectBusiness(business)}
              >
                <div className="flex gap-4">
                  {/* Photo */}
                  {business.photos[0] && (
                    <img
                      src={business.photos[0].url}
                      alt={business.name}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  
                  {/* Business Info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-1">
                      {business.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {business.rating > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold">{business.rating.toFixed(1)}</span>
                          <span className="ml-1">({business.totalRatings} reviews)</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          {business.address.street}, {business.address.city}, {business.address.state} {business.address.zip}
                        </span>
                      </div>
                      
                      {business.phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{business.phone}</span>
                        </div>
                      )}
                      
                      {business.website && (
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2" />
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Select Button */}
                  <div className="flex items-center">
                    <Button variant="primary" className="whitespace-nowrap">
                      Select <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
                
                {/* Preview info */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    ✅ This will pre-fill: Name, Address, Phone, Photos
                    {business.website && ', Website'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Not Found / Skip Option */}
      {hasSearched && results.length === 0 && !searching && !error && (
        <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            Can't find your business? No problem!
          </p>
          <Button variant="outline" onClick={onSkip}>
            Enter Information Manually
          </Button>
        </div>
      )}

      {/* Always show skip option */}
      <div className="border-t border-gray-200 pt-6 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Not finding your business or prefer to enter manually?
        </p>
        <Button variant="outline" onClick={onSkip}>
          Skip and Enter Manually
        </Button>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Searching for your business saves 5-10 minutes of data entry! 
          We'll automatically fill in your address, phone number, and photos from Google.
        </p>
      </div>
    </div>
  );
};
