import React from 'react';
import { Button } from '../common';
import { Building2, MapPin, Camera, Heart, Check } from 'lucide-react';
import { providerTypes, medicalServices, dentalServices, cosmeticServices, fitnessServices, massageServices, mentalHealthServices, skincareServices } from '../../data/providerData';

interface StepReviewProps {
  data: any;
  onNext: () => void;
  onBack: () => void;
}

export const StepReview: React.FC<StepReviewProps> = ({ data, onNext, onBack }) => {
  // Get provider type labels
  const selectedTypes = (data.providerTypes || []).map((typeValue: string) => {
    const type = providerTypes.find(pt => pt.value === typeValue);
    return type ? `${type.icon} ${type.label}` : typeValue;
  }).join(', ');

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
  
  const services = (data.services || []).map((serviceId: string) => {
    return allServices.find(s => s.id === serviceId);
  }).filter(Boolean);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>
      
      <p className="text-gray-600 mb-6">
        Review your information before submitting. You can go back to edit any section.
      </p>
      
      {/* Practice Info Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center text-lg">
          <Building2 className="w-5 h-5 mr-2 text-primary-600" />
          Practice Information
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Practice Name</p>
              <p className="font-medium">{data.practiceName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Provider Type(s)</p>
              <p className="font-medium">{selectedTypes}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{data.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{data.email}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Location Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center text-lg">
          <MapPin className="w-5 h-5 mr-2 text-primary-600" />
          Location & Contact
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="font-medium">{data.address?.street}</p>
          {data.address?.suite && <p className="text-gray-700">{data.address.suite}</p>}
          <p className="text-gray-700">
            {data.address?.city}, {data.address?.state} {data.address?.zip}
          </p>
          {data.website && (
            <p className="mt-2 text-primary-600">
              <a href={data.website} target="_blank" rel="noopener noreferrer">
                {data.website}
              </a>
            </p>
          )}
        </div>
      </div>
      
      {/* Photos Section */}
      {data.photos && data.photos.gallery && data.photos.gallery.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center text-lg">
            <Camera className="w-5 h-5 mr-2 text-primary-600" />
            Photos ({data.photos.gallery.length})
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {data.photos.gallery.map((photo: string, idx: number) => (
              <div key={idx} className="relative">
                <img
                  src={photo}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                />
                {idx === 0 && (
                  <div className="absolute top-1 left-1 bg-primary-500 text-white text-xs px-2 py-0.5 rounded">
                    Primary
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Services Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center text-lg">
          <Heart className="w-5 h-5 mr-2 text-primary-600" />
          Services ({services.length})
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service: any) => (
            <div key={service.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="font-medium text-sm">{service.name}</p>
              <p className="text-xs text-gray-600 mt-1">
                {service.duration} min • ${service.price}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Optional Info */}
      {data.optionalInfo && Object.keys(data.optionalInfo).some((key: string) => data.optionalInfo[key]) && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center text-lg">
            <Check className="w-5 h-5 mr-2 text-primary-600" />
            Additional Information
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
            {data.optionalInfo.licenseNumber && (
              <div>
                <p className="text-sm text-gray-600">License Number</p>
                <p className="font-medium">{data.optionalInfo.licenseNumber}</p>
              </div>
            )}
            {data.optionalInfo.yearsExperience && (
              <div>
                <p className="text-sm text-gray-600">Years of Experience</p>
                <p className="font-medium">{data.optionalInfo.yearsExperience} years</p>
              </div>
            )}
            {data.optionalInfo.education && (
              <div>
                <p className="text-sm text-gray-600">Education</p>
                <p className="font-medium">{data.optionalInfo.education}</p>
              </div>
            )}
            {data.optionalInfo.certifications && data.optionalInfo.certifications.length > 0 && (
              <div>
                <p className="text-sm text-gray-600">Certifications</p>
                <p className="font-medium">{data.optionalInfo.certifications.length} selected</p>
              </div>
            )}
            {data.optionalInfo.insuranceAccepted && data.optionalInfo.insuranceAccepted.length > 0 && (
              <div>
                <p className="text-sm text-gray-600">Insurance Accepted</p>
                <p className="font-medium">{data.optionalInfo.insuranceAccepted.length} plans</p>
              </div>
            )}
            {data.optionalInfo.languagesSpoken && data.optionalInfo.languagesSpoken.length > 0 && (
              <div>
                <p className="text-sm text-gray-600">Languages</p>
                <p className="font-medium">{data.optionalInfo.languagesSpoken.length} languages</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Completion Checklist */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <div className="bg-green-500 text-white rounded-full p-2 mr-4">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800 text-lg mb-2">Profile Information Complete!</h3>
            <p className="text-sm text-green-700">
              Your profile looks great! Next, you'll review and sign the Provider Participation Agreement. 
              After approval, you'll be able to receive bookings from patients on the Findr Health platform.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          ← Back to Edit
        </Button>
        <Button variant="primary" onClick={onNext} size="lg" className="px-8">
          Continue to Agreement →
        </Button>
      </div>
    </div>
  );
};
export default StepReview;
