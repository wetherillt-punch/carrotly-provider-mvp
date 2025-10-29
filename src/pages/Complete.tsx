import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common';
import { Check, Clock, Shield, Rocket } from 'lucide-react';

export const Complete: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-14 h-14 text-white" strokeWidth={3} />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🎉 Profile Complete!
          </h1>
          
          <p className="text-xl text-gray-600">
            Your provider profile has been submitted for review.
          </p>
        </div>

        {/* What Happens Next Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">What happens next:</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center mb-1">
                  <Clock className="w-5 h-5 text-primary-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Profile Review</h3>
                </div>
                <p className="text-gray-600">
                  Our team will review your profile within <strong>24-48 hours</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center mb-1">
                  <Shield className="w-5 h-5 text-primary-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Verification</h3>
                </div>
                <p className="text-gray-600">
                  We'll verify your credentials and contact information
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center mb-1">
                  <Check className="w-5 h-5 text-primary-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Approval Notification</h3>
                </div>
                <p className="text-gray-600">
                  Once approved, you'll receive an email confirmation
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center mb-1">
                  <Rocket className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Go Live!</h3>
                </div>
                <p className="text-gray-600">
                  Your profile will go live and start receiving bookings from patients
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="px-8"
          >
            Go to Dashboard →
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/preview')}
          >
            Preview Profile
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">
            You can update your profile anytime from your dashboard
          </p>
          <a 
            href="#" 
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Questions? Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
};
