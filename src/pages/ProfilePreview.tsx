import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProviderData } from '../hooks/useProviderData';
import { Button } from '../components/common';
import { 
  MapPin, Phone, Mail, Globe, Star, Calendar, Camera, 
  Heart, Clock, DollarSign, Award, Languages
} from 'lucide-react';
import { providerTypes, medicalServices, dentalServices, cosmeticServices, fitnessServices, massageServices, mentalHealthServices, skincareServices, US_STATES, LANGUAGES } from '../data/providerData';

export const ProfilePreview: React.FC = () => {
  const navigate = useNavigate();
  const { provider } = useProviderData();
  const [viewMode, setViewMode] = useState<'patient' | 'edit'>('patient');

  if (!provider || !provider.practiceName) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No profile data found</p>
          <Button variant="primary" onClick={() => navigate('/onboarding')}>
            Complete Onboarding
          </Button>
        </div>
      </div>
    );
  }

  // Get service details
  const allServices = [
    ...medicalServices,
    ...dentalServices,
    ...cosmeticServices,
    ...fitnessServices,
    ...massageServices,
    ...mentalHealthServices,
    ...skincareServices
  ];
  
  const services = (provider.services || []).map(serviceId => {
    return allServices.find(s => s.id === serviceId);
  }).filter(Boolean);

  // Get provider type details
  const selectedTypes = (provider.providerTypes || []).map(typeValue => {
    const type = providerTypes.find(pt => pt.value === typeValue);
    return type;
  }).filter(Boolean);

  // Get state label
  const stateLabel = US_STATES.find(s => s.value === provider.address?.state)?.label;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Toggle */}
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Profile Preview</h1>
              <p className="text-sm text-gray-600">How patients see your profile</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('patient')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'patient'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  👤 Patient View
                </button>
                <button
                  onClick={() => setViewMode('edit')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'edit'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ✏️ Edit Mode
                </button>
              </div>
              
              <Button
                variant="primary"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard →
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />
          
          <div className="p-6 -mt-16">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Profile Photo */}
              {provider.photos?.primary ? (
                <img
                  src={provider.photos.primary}
                  alt={provider.practiceName}
                  className="w-32 h-32 rounded-xl border-4 border-white shadow-xl object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-xl border-4 border-white shadow-xl bg-gray-200 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
              )}
              
              <div className="flex-1 md:mt-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{provider.practiceName}</h1>
                
                {/* Provider Types */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedTypes.map(type => (
                    <span
                      key={type!.value}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                    >
                      <span className="mr-1.5">{type!.icon}</span>
                      {type!.label}
                    </span>
                  ))}
                </div>
                
                {/* Rating & Stats */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">4.8</span>
                    <span className="ml-1">(127 reviews)</span>
                  </div>
                  <span>•</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Accepting new patients
                  </span>
                </div>
              </div>
              
              {/* CTA Button */}
              {viewMode === 'patient' && (
                <Button variant="primary" size="lg" className="mt-4 md:mt-12 whitespace-nowrap">
                  Book Appointment
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Contact & Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Location Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary-600" />
              Location
            </h2>
            <div className="text-gray-700 space-y-1">
              <p>{provider.address?.street}</p>
              {provider.address?.suite && <p>{provider.address.suite}</p>}
              <p>
                {provider.address?.city}, {stateLabel} {provider.address?.zip}
              </p>
            </div>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-3 flex items-center">
              Get Directions →
            </button>
          </div>
          
          {/* Contact Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-primary-600" />
              Contact
            </h2>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <span>{provider.phone}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <span>{provider.email}</span>
              </div>
              {provider.website && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-3 text-gray-400" />
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Visit Website →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-2 text-primary-600" />
            Services Offered ({services.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service: any) => (
              <div 
                key={service.id} 
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.duration} min
                  </span>
                  <span className="font-semibold text-gray-900 flex items-center">
                    <DollarSign className="w-4 h-4" />
                    {service.price}
                  </span>
                </div>
                {viewMode === 'patient' && (
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Book this service →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Photos Gallery */}
        {provider.photos?.gallery && provider.photos.gallery.length > 1 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Camera className="w-6 h-6 mr-2 text-primary-600" />
              Photos ({provider.photos.gallery.length})
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {provider.photos.gallery.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity shadow"
                />
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        {provider.optionalInfo && Object.values(provider.optionalInfo).some(value => value !== undefined && value !== null && (Array.isArray(value) ? value.length > 0 : true)) && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Additional Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {provider.optionalInfo.yearsExperience && (
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Experience
                  </p>
                  <p className="font-medium text-gray-900">{provider.optionalInfo.yearsExperience} years</p>
                </div>
              )}
              
              {provider.optionalInfo.education && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Education</p>
                  <p className="font-medium text-gray-900">{provider.optionalInfo.education}</p>
                </div>
              )}
              
              {provider.optionalInfo.languagesSpoken && provider.optionalInfo.languagesSpoken.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-1 flex items-center">
                    <Languages className="w-4 h-4 mr-2" />
                    Languages
                  </p>
                  <p className="font-medium text-gray-900">
                    {provider.optionalInfo.languagesSpoken
                      .map(lang => LANGUAGES.find(l => l.value === lang)?.label)
                      .join(', ')}
                  </p>
                </div>
              )}
              
              {provider.optionalInfo.insuranceAccepted && provider.optionalInfo.insuranceAccepted.length > 0 && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 mb-2">Insurance Accepted</p>
                  <div className="flex flex-wrap gap-2">
                    {provider.optionalInfo.insuranceAccepted.map(insurance => (
                      <span
                        key={insurance}
                        className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                      >
                        {insurance.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
