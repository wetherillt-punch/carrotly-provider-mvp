import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../common';
import { providerTypes } from '../../data/providerData';
import { Check } from 'lucide-react';

interface StepBasicsProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export const StepBasics: React.FC<StepBasicsProps> = ({ data, onNext, onBack }) => {
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>(data.providerTypes || []);
  const isPreFilled = data.preFilledFromGoogle === true;
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      practiceName: data.practiceName || '',
      phone: data.phone || '',
      email: data.email || '',
    }
  });

  const toggleType = (typeValue: string) => {
    if (selectedTypes.includes(typeValue)) {
      setSelectedTypes(selectedTypes.filter(t => t !== typeValue));
    } else {
      setSelectedTypes([...selectedTypes, typeValue]);
    }
  };

  const onSubmit = (formData: any) => {
    if (selectedTypes.length === 0) {
      alert('Please select at least one provider type');
      return;
    }
    onNext({ ...formData, providerTypes: selectedTypes });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-6">Step 1 of 5: The Basics</h2>
      
      {isPreFilled && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
          <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 font-medium">Information Pre-Filled!</p>
            <p className="text-green-700 text-sm">
              We've automatically filled in your business information from Google. 
              Please review and update if needed.
            </p>
          </div>
        </div>
      )}
      
      <p className="text-gray-600 mb-6">
        Let's start with some basic information. Takes about 2 minutes.
      </p>
      
      {/* Practice Name */}
      <Input
        label="Practice or Business Name *"
        placeholder="e.g., Smith Family Medicine"
        {...register('practiceName', { required: 'Practice name is required' })}
        error={errors.practiceName?.message}
      />
      
      {/* Provider Types - Multi-Select */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          What type of services do you provide? * 
          <span className="text-gray-500 font-normal"> (Select all that apply)</span>
        </label>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {providerTypes.map(type => (
            <button
              key={type.value}
              type="button"
              onClick={() => toggleType(type.value)}
              className={`
                flex items-center p-4 border-2 rounded-lg cursor-pointer
                transition-all hover:border-primary-300
                ${selectedTypes.includes(type.value) 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <span className="text-3xl mr-3">{type.icon}</span>
              <span className="font-medium flex-1 text-left">{type.label}</span>
              {selectedTypes.includes(type.value) && (
                <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
        
        {selectedTypes.length === 0 && (
          <p className="text-orange-600 text-sm mt-2">Please select at least one type</p>
        )}
      </div>
      
      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Input
          label="Phone Number *"
          type="tel"
          placeholder="(406) 555-0123"
          {...register('phone', { required: 'Phone is required' })}
          error={errors.phone?.message}
        />
        
        <Input
          label="Email Address *"
          type="email"
          placeholder="contact@practice.com"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors.email?.message}
        />
      </div>
      
      {/* Progress Indicator */}
      <div className="mt-6 text-sm text-gray-500 flex items-center">
        <Check className="w-4 h-4 mr-2 text-green-500" />
        Required fields only • Optional details in Step 5
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" type="button" onClick={onBack} disabled>
          ← Back
        </Button>
        <Button variant="primary" type="submit">
          Continue to Location →
        </Button>
      </div>
    </form>
  );
};
