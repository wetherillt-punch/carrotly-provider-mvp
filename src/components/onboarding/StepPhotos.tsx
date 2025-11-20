import React, { useState } from 'react';
import { Upload, Camera, X, Lightbulb } from 'lucide-react';

interface StepPhotosProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export const StepPhotos: React.FC<StepPhotosProps> = ({ data, onNext, onBack }) => {
  const [photos, setPhotos] = useState<string[]>(data.photos?.gallery || []);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (photos.length >= 5) {
        setError('Maximum 5 photos allowed');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('File exceeds 5MB limit');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotos(prev => [...prev, e.target!.result as string]);
          setError('');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (photos.length === 0) {
      setError('Please upload at least 1 photo');
      return;
    }
    
    console.log('Photos submitted:', photos.length); // Debug
    
    onNext({
      photos: {
        primary: photos[0],
        gallery: photos,
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Step 3 of 7: Photos</h2>
        <p className="text-gray-600">
          Add photos of your practice or office. At least 1 photo required, up to 5 total.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          dragActive
            ? 'border-teal-500 bg-teal-50'
            : 'border-gray-300 bg-gray-50 hover:border-teal-400'
        } ${photos.length >= 5 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => photos.length < 5 && document.getElementById('photoInput')?.click()}
      >
        <input
          id="photoInput"
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={photos.length >= 5}
        />
        
        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drop photos here or click to browse
        </p>
        <p className="text-sm text-gray-500">
          JPG, PNG up to 5MB • {photos.length}/5 photos uploaded
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Photo Gallery */}
      {photos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="relative group rounded-xl overflow-hidden border-2 border-gray-200 hover:border-teal-400 transition"
              >
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-40 object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-teal-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                    Primary Photo
                  </div>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(index);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
            <Camera className="w-4 h-4 text-teal-600" />
            <span>The first photo will be your primary photo shown to patients</span>
          </div>
        </div>
      )}

      {/* Tip Box */}
      <div className="bg-teal-50 border-l-4 border-teal-500 rounded-r-lg p-4">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-teal-900">
            <p className="font-semibold mb-1">Tip:</p>
            <p>Upload clear, well-lit photos of your office, waiting room, or treatment areas. Professional photos help patients feel comfortable booking with you.</p>
          </div>
        </div>
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
          type="button"
          onClick={handleContinue}
          className={`px-8 py-3 rounded-xl font-semibold transition-all shadow-md ${
            photos.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 hover:shadow-lg'
          }`}
          disabled={photos.length === 0}
        >
          {photos.length === 0 ? 'Add at least 1 photo to continue' : 'Continue to Services →'}
        </button>
      </div>
    </div>
  );
};

export default StepPhotos;
