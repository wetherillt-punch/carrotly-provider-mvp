import React, { useState } from 'react';
import { Search, Check, Pencil, X } from 'lucide-react';

interface StepServicesProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

interface Service {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  customPrice?: number;
  customDuration?: number;
}

// Service data based on provider types
const allServices: Record<string, Service[]> = {
  medical: [
    { id: 'annual-physical', name: 'Annual Physical Exam', category: 'Preventive', duration: 45, price: 150 },
    { id: 'wellness-checkup', name: 'Wellness Checkup', category: 'Preventive', duration: 30, price: 125 },
    { id: 'sports-physical', name: 'Sports Physical', category: 'Preventive', duration: 30, price: 100 },
    { id: 'sick-visit', name: 'Sick Visit', category: 'Acute Care', duration: 20, price: 100 },
    { id: 'urgent-care', name: 'Urgent Care Consultation', category: 'Acute Care', duration: 30, price: 150 },
    { id: 'diabetes-mgmt', name: 'Diabetes Management', category: 'Chronic Care', duration: 30, price: 125 },
    { id: 'hypertension', name: 'Hypertension Follow-up', category: 'Chronic Care', duration: 20, price: 100 },
    { id: 'flu-vax', name: 'Flu Vaccination', category: 'Vaccinations', duration: 15, price: 40 },
    { id: 'covid-vax', name: 'COVID-19 Vaccination', category: 'Vaccinations', duration: 15, price: 50 },
    { id: 'lab-work', name: 'Lab Work', category: 'Diagnostic', duration: 15, price: 50 },
    { id: 'strep-test', name: 'Strep Test', category: 'Diagnostic', duration: 15, price: 60 },
    { id: 'ekg', name: 'EKG/ECG', category: 'Diagnostic', duration: 20, price: 100 },
    { id: 'telehealth', name: 'Telehealth Consultation', category: 'Virtual', duration: 20, price: 75 },
  ],
  dental: [
    { id: 'dental-cleaning', name: 'Dental Cleaning', category: 'Preventive', duration: 60, price: 120 },
    { id: 'deep-cleaning', name: 'Deep Cleaning', category: 'Preventive', duration: 90, price: 250 },
    { id: 'exam-xrays', name: 'Exam & X-rays', category: 'Preventive', duration: 45, price: 150 },
    { id: 'fluoride', name: 'Fluoride Treatment', category: 'Preventive', duration: 15, price: 40 },
    { id: 'filling', name: 'Filling', category: 'Restorative', duration: 60, price: 200 },
    { id: 'crown', name: 'Crown', category: 'Restorative', duration: 120, price: 1200 },
    { id: 'root-canal', name: 'Root Canal', category: 'Restorative', duration: 90, price: 1000 },
    { id: 'teeth-whitening', name: 'Teeth Whitening', category: 'Cosmetic', duration: 60, price: 400 },
    { id: 'veneers', name: 'Veneers', category: 'Cosmetic', duration: 120, price: 1500 },
    { id: 'emergency-dental', name: 'Emergency Dental Exam', category: 'Emergency', duration: 30, price: 150 },
  ],
  // Add more service types as needed
};

export const StepServices: React.FC<StepServicesProps> = ({ data, onNext, onBack }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(data.services || []);
  const [customizedServices, setCustomizedServices] = useState<Record<string, { price: number; duration: number }>>(data.customizedServices || {});
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  // Get services based on selected provider types
  const providerTypes = data.providerTypes || [];
  const availableServices: Service[] = providerTypes.flatMap((type: string) => 
    allServices[type] || []
  );

  // Filter services by search
  const filteredServices = availableServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
    setError('');
  };

  const startEdit = (serviceId: string) => {
    const service = availableServices.find(s => s.id === serviceId);
    const customized = customizedServices[serviceId];
    
    if (service) {
      setEditingService(serviceId);
      setEditPrice((customized?.price || service.price).toString());
      setEditDuration((customized?.duration || service.duration).toString());
    }
  };

  const saveEdit = () => {
    if (!editingService) return;
    
    const price = parseFloat(editPrice);
    const duration = parseInt(editDuration);
    
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }
    
    if (isNaN(duration) || duration <= 0) {
      alert('Please enter a valid duration');
      return;
    }
    
    setCustomizedServices(prev => ({
      ...prev,
      [editingService]: { price, duration }
    }));
    
    setEditingService(null);
  };

  const cancelEdit = () => {
    setEditingService(null);
    setEditPrice('');
    setEditDuration('');
  };

  const getServiceDetails = (service: Service) => {
    const customized = customizedServices[service.id];
    return {
      price: customized?.price || service.price,
      duration: customized?.duration || service.duration,
      isCustomized: !!customized
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedServices.length < 2) {
      setError('Please select at least 2 services to continue');
      return;
    }

    onNext({
      services: selectedServices,
      customizedServices
    });
  };

  // Group services by category
  const categories = [...new Set(filteredServices.map(s => s.category))];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Step 4 of 7: Your Services</h2>
        <p className="text-gray-600">
          Select the services you offer. Choose at least 2 to get started. You can customize pricing.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* Selected Count */}
      <div className="text-sm text-gray-600">
        {selectedServices.length} services selected
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Services by Category */}
      <div className="space-y-6">
        {categories.map(category => {
          const categoryServices = filteredServices.filter(s => s.category === category);
          if (categoryServices.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryServices.map(service => {
                  const isSelected = selectedServices.includes(service.id);
                  const details = getServiceDetails(service);
                  const isEditing = editingService === service.id;

                  return (
                    <div
                      key={service.id}
                      className={`relative p-4 border-2 rounded-xl transition-all ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-teal-300 bg-white'
                      }`}
                    >
                      {/* Checkbox & Name */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleService(service.id)}
                          className="mt-1 w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{service.name}</h4>
                          
                          {isEditing ? (
                            /* Edit Mode */
                            <div className="mt-2 space-y-2">
                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  value={editDuration}
                                  onChange={(e) => setEditDuration(e.target.value)}
                                  placeholder="Duration"
                                  className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600 self-center">min</span>
                                <input
                                  type="number"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  placeholder="Price"
                                  className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-teal-500"
                                />
                                <span className="text-sm text-gray-600 self-center">$</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={saveEdit}
                                  className="px-3 py-1 text-xs bg-teal-500 text-white rounded hover:bg-teal-600"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* Display Mode */
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>{details.duration} min</span>
                                <span>•</span>
                                <span className={details.isCustomized ? 'text-teal-600 font-medium' : ''}>
                                  ${details.price}
                                </span>
                                {details.isCustomized && (
                                  <span className="text-xs text-teal-600">(edited)</span>
                                )}
                              </div>
                              
                              {isSelected && (
                                <button
                                  type="button"
                                  onClick={() => startEdit(service.id)}
                                  className="p-1 text-gray-400 hover:text-teal-600 transition"
                                  title="Edit pricing"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {isSelected && !isEditing && (
                          <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-teal-50 border-l-4 border-teal-500 rounded-r-lg p-4">
        <p className="text-sm text-teal-900">
          <strong>Tip:</strong> Click the pencil icon on selected services to customize pricing and duration. You can add more custom services later from your dashboard.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
        >
          Continue to Optional Details →
        </button>
      </div>
    </form>
  );
};

export default StepServices;
