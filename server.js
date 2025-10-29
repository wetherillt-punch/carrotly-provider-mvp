// Simple Express server for Google Places API
// This keeps your API key secure (never exposed to frontend)

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// IMPORTANT: Replace with your actual Google Places API key
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'YOUR_API_KEY_HERE';

// Search for business by name
app.post('/api/search-business', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    console.log('Searching for:', query);

    // Step 1: Find Place from Text
    const searchResponse = await axios.get(
      'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
      {
        params: {
          input: query,
          inputtype: 'textquery',
          fields: 'place_id,name,formatted_address,photos,business_status',
          key: GOOGLE_API_KEY
        }
      }
    );

    const candidates = searchResponse.data.candidates;

    if (!candidates || candidates.length === 0) {
      return res.json({ results: [], message: 'No businesses found' });
    }

    // Step 2: Get detailed info for each candidate
    const detailedResults = await Promise.all(
      candidates.slice(0, 3).map(async (candidate) => {
        try {
          const detailsResponse = await axios.get(
            'https://maps.googleapis.com/maps/api/place/details/json',
            {
              params: {
                place_id: candidate.place_id,
                fields: 'name,formatted_address,formatted_phone_number,website,photos,opening_hours,rating,user_ratings_total,types,address_components,geometry',
                key: GOOGLE_API_KEY
              }
            }
          );

          const details = detailsResponse.data.result;

          // Transform to our format
          return {
            placeId: candidate.place_id,
            name: details.name,
            address: parseAddress(details.address_components),
            phone: details.formatted_phone_number || '',
            website: details.website || '',
            photos: details.photos ? details.photos.slice(0, 5).map(photo => ({
              reference: photo.photo_reference,
              url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
            })) : [],
            rating: details.rating || 0,
            totalRatings: details.user_ratings_total || 0,
            providerTypes: mapGoogleTypesToProviderTypes(details.types),
            hours: details.opening_hours?.weekday_text || [],
            location: details.geometry?.location || {}
          };
        } catch (error) {
          console.error('Error fetching details:', error.message);
          return null;
        }
      })
    );

    // Filter out any null results
    const validResults = detailedResults.filter(r => r !== null);

    res.json({
      results: validResults,
      count: validResults.length
    });

  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({
      error: 'Failed to search businesses',
      details: error.message
    });
  }
});

// Get photo URL
app.get('/api/photo/:photoReference', async (req, res) => {
  try {
    const { photoReference } = req.params;
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`;
    res.json({ url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get photo' });
  }
});

// Helper: Parse address components into our format
function parseAddress(components) {
  if (!components) return {};

  const address = {
    street: '',
    suite: '',
    city: '',
    state: '',
    zip: ''
  };

  components.forEach(component => {
    const types = component.types;
    
    if (types.includes('street_number')) {
      address.street = component.long_name + ' ';
    }
    if (types.includes('route')) {
      address.street += component.long_name;
    }
    if (types.includes('subpremise')) {
      address.suite = component.long_name;
    }
    if (types.includes('locality')) {
      address.city = component.long_name;
    }
    if (types.includes('administrative_area_level_1')) {
      address.state = component.short_name;
    }
    if (types.includes('postal_code')) {
      address.zip = component.long_name;
    }
  });

  return address;
}

// Helper: Map Google types to our provider types
function mapGoogleTypesToProviderTypes(googleTypes) {
  const mapping = {
    'doctor': 'medical',
    'hospital': 'medical',
    'health': 'medical',
    'physiotherapist': 'medical',
    'dentist': 'dental',
    'spa': 'massage',
    'beauty_salon': 'cosmetic',
    'hair_care': 'cosmetic',
    'gym': 'fitness',
    'psychologist': 'mental-health',
    'counselor': 'mental-health'
  };

  const providerTypes = [];
  
  googleTypes.forEach(type => {
    const mapped = mapping[type];
    if (mapped && !providerTypes.includes(mapped)) {
      providerTypes.push(mapped);
    }
  });

  // Default to medical if nothing matched
  if (providerTypes.length === 0) {
    providerTypes.push('medical');
  }

  return providerTypes;
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📍 Google Places API: ${GOOGLE_API_KEY ? '✅ Configured' : '❌ Missing API key'}`);
});
