import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select } from '../common';
import { US_STATES, CERTIFICATIONS, INSURANCE_PLANS, LANGUAGES } from '../../data/providerData';
import { ChevronDown, ChevronUp, Award, GraduationCap, FileText, Briefcase, Globe } from 'lucide-react';

interface StepOptionalDetailsProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  icon, 
  isExpanded, 
  onToggle, 
  children 
}) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <div className="text-primary-600 mr-3">{icon}</div>
          <span className="font-medium">{title}</span>
          <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Optional</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
};

// Multi-select component
const MultiSelect: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
}> = ({ label, options, value, onChange }) => {
  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-2 bg-white">
        {options.map(option => (
          <label
            key={option.value}
            className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => toggleOption(option.value)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      {value.length > 0 && (
        <p className="text-sm text-gray-600 mt-1">{value.length} selected</p>
      )}
    </div>
  );
};

export const StepOptionalDetails: React.FC<StepOptionalDetailsProps> = ({ data, onNext, onBack }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>(
    data.optionalInfo?.certifications || []
  );
  const [insuranceAccepted, setInsuranceAccepted] = useState<string[]>(
    data.optionalInfo?.insuranceAccepted || []
  );
  const [languages, setLanguages] = useState<string[]>(
    data.optionalInfo?.languagesSpoken || []
  );
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      optionalInfo: {
        licenseNumber: data.optionalInfo?.licenseNumber || '',
        licenseState: data.optionalInfo?.licenseState || '',
        licenseExpiration: data.optionalInfo?.licenseExpiration || '',
        yearsExperience: data.optionalInfo?.yearsExperience || '',
        education: data.optionalInfo?.education || '',
      }
    }
  });

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const onSubmit = (formData: any) => {
    onNext({
      optionalInfo: {
        ...formData.optionalInfo,
        certifications,
        insuranceAccepted,
        languagesSpoken: languages,
      }
    });
  };

  const handleSkip = () => {
    onNext({});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-6">Step 5 of 5: Additional Details (Optional)</h2>
      
      <p className="text-gray-600 mb-6">
        Add more information to make your profile stand out. All fields on this page are optional - 
        you can skip this step and add details later from your dashboard.
      </p>
      
      {/* Licensing Section */}
      <CollapsibleSection
        title="Licensing & Credentials"
        icon={<Award className="w-5 h-5" />}
        isExpanded={expandedSections.includes('licensing')}
        onToggle={() => toggleSection('licensing')}
      >
        <div className="space-y-4">
          <Input
            label="License Number"
            placeholder="e.g., MT-12345"
            {...register('optionalInfo.licenseNumber')}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="License State"
              {...register('optionalInfo.licenseState')}
              options={US_STATES}
            />
            
            <Input
              label="Expiration Date"
              type="date"
              {...register('optionalInfo.licenseExpiration')}
            />
          </div>
        </div>
      </CollapsibleSection>
      
      {/* Certifications Section */}
      <CollapsibleSection
        title="Certifications & Specializations"
        icon={<GraduationCap className="w-5 h-5" />}
        isExpanded={expandedSections.includes('certifications')}
        onToggle={() => toggleSection('certifications')}
      >
        <MultiSelect
          label="Board Certifications & Professional Credentials"
          options={CERTIFICATIONS}
          value={certifications}
          onChange={setCertifications}
        />
      </CollapsibleSection>
      
      {/* Insurance Section */}
      <CollapsibleSection
        title="Insurance Accepted"
        icon={<FileText className="w-5 h-5" />}
        isExpanded={expandedSections.includes('insurance')}
        onToggle={() => toggleSection('insurance')}
      >
        <MultiSelect
          label="Insurance Plans You Accept"
          options={INSURANCE_PLANS}
          value={insuranceAccepted}
          onChange={setInsuranceAccepted}
        />
      </CollapsibleSection>
      
      {/* Experience & Education Section */}
      <CollapsibleSection
        title="Experience & Education"
        icon={<Briefcase className="w-5 h-5" />}
        isExpanded={expandedSections.includes('experience')}
        onToggle={() => toggleSection('experience')}
      >
        <div className="space-y-4">
          <Input
            label="Years of Experience"
            type="number"
            placeholder="e.g., 10"
            {...register('optionalInfo.yearsExperience')}
          />
          
          <Input
            label="Education"
            placeholder="e.g., MD from Johns Hopkins University"
            {...register('optionalInfo.education')}
          />
        </div>
      </CollapsibleSection>
      
      {/* Languages Section */}
      <CollapsibleSection
        title="Languages Spoken"
        icon={<Globe className="w-5 h-5" />}
        isExpanded={expandedSections.includes('languages')}
        onToggle={() => toggleSection('languages')}
      >
        <MultiSelect
          label="Languages"
          options={LANGUAGES}
          value={languages}
          onChange={setLanguages}
        />
      </CollapsibleSection>
      
      {/* Skip Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg text-center border border-gray-200">
        <p className="text-gray-700 mb-3">
          These details help patients find you, but you can add them later from your dashboard.
        </p>
        <Button
          variant="outline"
          type="button"
          onClick={handleSkip}
          className="mr-3"
        >
          Skip for Now
        </Button>
        <span className="text-gray-500 text-sm">or</span>
        <Button
          variant="ghost"
          type="button"
          onClick={() => setExpandedSections(['licensing', 'certifications', 'insurance', 'experience', 'languages'])}
          className="ml-3"
        >
          Expand All Sections
        </Button>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" type="button" onClick={onBack}>
          ← Back
        </Button>
        <Button variant="primary" type="submit">
          Save & Continue to Review →
        </Button>
      </div>
    </form>
  );
};
export default StepOptionalDetails;
