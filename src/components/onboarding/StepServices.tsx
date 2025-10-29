import React, { useState, useMemo } from 'react';
import { Button } from '../common';
import { 
  medicalServices, 
  dentalServices, 
  cosmeticServices, 
  fitnessServices, 
  massageServices, 
  mentalHealthServices, 
  skincareServices 
} from '../../data/providerData';
import { Service } from '../../types';
import { Search, Check, Info, Edit2, X, Save } from 'lucide-react';

interface ServiceDetail extends Service {
  customName?: string;
  customPrice?: string;
  customDescription?: string;
}

interface StepServicesProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export const StepServices: React.FC<StepServicesProps> = ({ data, onNext, onBack }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(data.services || []);
  const [servicesDetails, setServicesDetails] = useState<Record<string, ServiceDetail>>(
    data.servicesDetails || {}
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', description: '' });

  // Get relevant services based on provider types selected in Step 1
  const relevantServices = useMemo(() => {
    const types = data.providerTypes || [];
    let services: Service[] = [];
    
    if (types.includes('medical')) services = [...services, ...medicalServices];
    if (types.includes('dental')) services = [...services, ...dentalServices];
    if (types.includes('cosmetic')) services = [...services, ...cosmeticServices];
    if (types.includes('fitness')) services = [...services, ...fitnessServices];
    if (types.includes('massage')) services = [...services, ...massageServices];
    if (types.includes('mental-health')) services = [...services, ...mentalHealthServices];
    if (types.includes('skincare')) services = [...services, ...skincareServices];
    
    return services;
  }, [data.providerTypes]);

  // Filter by search term
  const filteredServices = useMemo(() => {
    if (!searchTerm) return relevantServices;
    const lower = searchTerm.toLowerCase();
    return relevantServices.filter(s => 
      s.name.toLowerCase().includes(lower) ||
      s.category.toLowerCase().includes(lower)
    );
  }, [relevantServices, searchTerm]);

  // Group by category
  const groupedServices = useMemo(() => {
    const groups: Record<string, Service[]> = {};
    filteredServices.forEach(service => {
      if (!groups[service.category]) {
        groups[service.category] = [];
      }
      groups[service.category].push(service);
    });
    return groups;
  }, [filteredServices]);

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
      // Remove from details
      const newDetails = { ...servicesDetails };
      delete newDetails[serviceId];
      setServicesDetails(newDetails);
    } else {
      setSelectedServices([...selectedServices, serviceId]);
      // Add to details with default values
      const service = relevantServices.find(s => s.id === serviceId);
      if (service) {
        setServicesDetails({
          ...servicesDetails,
          [serviceId]: { ...service }
        });
      }
    }
  };

  const startEditing = (serviceId: string) => {
    const detail = servicesDetails[serviceId];
    if (detail) {
      setEditingService(serviceId);
      setEditForm({
        name: detail.customName || detail.name,
        price: detail.customPrice || `$${detail.price}`,
        description: detail.customDescription || ''
      });
    }
  };

  const saveEdit = () => {
    if (!editingService) return;

    setServicesDetails({
      ...servicesDetails,
      [editingService]: {
        ...servicesDetails[editingService],
        customName: editForm.name.trim() || servicesDetails[editingService].name,
        customPrice: editForm.price.trim(),
        customDescription: editForm.description.trim()
      }
    });

    setEditingService(null);
    setEditForm({ name: '', price: '', description: '' });
  };

  const cancelEdit = () => {
    setEditingService(null);
    setEditForm({ name: '', price: '', description: '' });
  };

  const handleNext = () => {
    if (selectedServices.length < 2) {
      alert('Please select at least 2 services to continue');
      return;
    }
    onNext({ 
      services: selectedServices,
      servicesDetails: servicesDetails
    });
  };

  const getDisplayName = (serviceId: string) => {
    const detail = servicesDetails[serviceId];
    return detail?.customName || detail?.name || '';
  };

  const getDisplayPrice = (serviceId: string) => {
    const detail = servicesDetails[serviceId];
    return detail?.customPrice || `$${detail?.price || 0}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Step 4 of 5: Your Services</h2>
      
      <p className="text-gray-600 mb-4">
        Select services and customize them with your own pricing and descriptions. 
        Choose at least 2 to get started.
      </p>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      {/* Selected Count */}
      <div className="mb-4 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
        <p className="text-sm font-medium text-gray-700">
          {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
          {selectedServices.length < 2 && (
            <span className="text-orange-600 ml-2">
              (Select at least 2 to continue)
            </span>
          )}
        </p>
        
        {selectedServices.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setSelectedServices([]);
              setServicesDetails({});
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Services List - Grouped by Category */}
      <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg mb-6">
        {Object.keys(groupedServices).length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No services found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-primary-600 hover:text-primary-700 mt-2 text-sm font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          Object.entries(groupedServices).map(([category, services]) => (
            <div key={category} className="border-b last:border-b-0">
              {/* Category Header */}
              <div className="bg-gray-50 px-4 py-2 font-medium text-sm text-gray-700 sticky top-0">
                {category} ({services.length})
              </div>
              
              {/* Services in Category */}
              <div className="divide-y">
                {services.map(service => {
                  const isSelected = selectedServices.includes(service.id);
                  const isEditing = editingService === service.id;
                  const detail = servicesDetails[service.id];
                  
                  return (
                    <div key={service.id}>
                      <label
                        className={`
                          flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors
                          ${isSelected ? 'bg-primary-50' : ''}
                        `}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleService(service.id)}
                          className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-gray-900">
                            {getDisplayName(service.id)}
                          </p>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <span>⏱️ {service.duration} min</span>
                            <span className="font-semibold text-green-600">
                              {getDisplayPrice(service.id)}
                            </span>
                          </div>
                          {detail?.customDescription && (
                            <p className="text-sm text-gray-600 mt-1 italic">
                              {detail.customDescription}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isSelected && (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  startEditing(service.id);
                                }}
                                className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                                title="Edit service details"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                            </>
                          )}
                        </div>
                      </label>

                      {/* Edit Form */}
                      {isEditing && (
                        <div className="px-4 pb-4 bg-white border-t-2 border-primary-200">
                          <div className="mt-3 space-y-3 bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900">Customize Service</h4>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Service Name
                              </label>
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                placeholder={service.name}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Your Price
                              </label>
                              <input
                                type="text"
                                value={editForm.price}
                                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                placeholder="e.g., $150, $50-$200, or Call for pricing"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description (Optional)
                              </label>
                              <textarea
                                value={editForm.description}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                placeholder="Brief description of what this service includes..."
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              />
                            </div>

                            <div className="flex gap-2 pt-2">
                              <button
                                type="button"
                                onClick={saveEdit}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                              >
                                <Save className="w-4 h-4" />
                                Save Changes
                              </button>
                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                              >
                                <X className="w-4 h-4" />
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800 flex items-start">
          <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <span>
            Click the <Edit2 className="w-3 h-3 inline mx-1" /> icon on any selected service to customize 
            its name, price, and add a description. Prices shown are defaults you can change.
          </span>
        </p>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={selectedServices.length < 2}
        >
          {selectedServices.length >= 2 ? 'Continue to Optional Info →' : 'Select at least 2 services'}
        </Button>
      </div>
    </div>
  );
};
