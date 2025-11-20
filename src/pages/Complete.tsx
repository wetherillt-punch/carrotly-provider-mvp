import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Shield, CheckCheck, Rocket } from 'lucide-react';
import FindrHeader from '../components/branding/FindrHeader';

export function Complete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <FindrHeader subtitle="Submission Complete" />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎉 Profile Complete!
          </h1>
          <p className="text-xl text-gray-600">
            Your provider profile has been submitted for review.
          </p>
        </div>

        {/* What Happens Next Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What happens next:</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Profile Review</h3>
                <p className="text-gray-600">
                  Our team will review your profile within <strong>24-48 hours</strong>
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Verification</h3>
                <p className="text-gray-600">
                  We'll verify your credentials and contact information
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <CheckCheck className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Approval Notification</h3>
                <p className="text-gray-600">
                  Once approved, you'll receive an email confirmation
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Go Live!</h3>
                <p className="text-gray-600">
                  Your profile will go live and start receiving bookings from patients
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
          >
            Go to Dashboard →
          </button>
          
          <button
            onClick={() => navigate('/preview')}
            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            Preview Profile
          </button>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 mb-2">
            You can update your profile anytime from your dashboard
          </p>
          <p className="text-sm text-gray-500">
            Questions? <a href="mailto:admin@findrhealth.com" className="text-teal-600 hover:text-teal-700 font-medium hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
}
