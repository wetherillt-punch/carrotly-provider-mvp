import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select } from '../common';
import { US_STATES } from '../../data/providerData';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface StepLocationProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export const StepLocation: React.FC<StepLocationProps> = ({ data, onNext, onBack }) => {
  const [showOptional, setShowOptional] = useState(!!data.address?.suite || !!data.website);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      address: {
        street: data.address?.street || '',
        suite: data.address?.suite || '',
        city: data.address?.city || '',
        state: data.address?.state || '',
        zip: data.address?.zip || '',
      },
      website: data.website || '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <h2 className="text-2xl font-bold mb-6">Step 2 of 5: Location</h2>
      
      <p className="text-gray-600 mb-6">
        Where are you located? Patients will use this to find you.
      </p>
      
      {/* Required Fields */}
      <Input
        label="Street Address *"
        placeholder="123 Main Street"
        {...register('address.street', { required: 'Street address is required' })}
        error={errors.address?.street?.message}
      />
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Input
          label="City *"
          placeholder="Bozeman"
          {...register('address.city', { required: 'City is required' })}
          error={errors.address?.city?.message}
        />
        
        <Select
          label="State *"
          {...register('address.state', { required: 'State is required' })}
          options={US_STATES}
          error={errors.address?.state?.message}
        />
        
        <Input
          label="ZIP Code *"
          placeholder="59715"
          {...register('address.zip', { 
            required: 'ZIP code is required',
            pattern: {
              value: /^\d{5}(-\d{4})?$/,
              message: 'Invalid ZIP code'
            }
          })}
          error={errors.address?.zip?.message}
        />
      </div>
      
      {/* Optional Fields - Collapsed by Default */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="text-primary-600 text-sm font-medium flex items-center hover:text-primary-700 transition-colors"
        >
          {showOptional ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Hide optional details
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Add suite/unit number or website (optional)
            </>
          )}
        </button>
        
        {showOptional && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4 border border-gray-200">
            <Input
              label="Suite/Unit Number"
              placeholder="Suite 201"
              {...register('address.suite')}
            />
            
            <Input
              label="Website"
              type="url"
              placeholder="https://www.yourpractice.com"
              {...register('website')}
            />
          </div>
        )}
      </div>
      
      {/* Map Preview Placeholder */}
      <div className="mt-6 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-2" />
          <p className="text-gray-600 font-medium">Map preview will appear here</p>
          <p className="text-gray-500 text-sm">Location will be shown to patients</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" type="button" onClick={onBack}>
          ← Back
        </Button>
        <Button variant="primary" type="submit">
          Continue to Photos →
        </Button>
      </div>
    </form>
  );
};
