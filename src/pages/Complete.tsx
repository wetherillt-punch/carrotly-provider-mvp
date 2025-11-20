import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Shield, CheckCheck, Rocket } from 'lucide-react';

export default function Complete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Profile Complete!</h1>
          <p className="text-xl text-gray-600">Your provider profile has been submitted for review.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What happens next:</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Profile Review</h3>
                </div>
                <p className="text-gray-600">Our team will review your profile within <strong>24-48 hours</strong></p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Verification</h3>
                </div>
                <p className="text-gray-600">We'll verify your credentials and contact information</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">3</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Approval Notification</h3>
                </div>
                <p className="text-gray-600">Once approved, you'll receive an email confirmation</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">4</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Rocket className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-gray-900">Go Live!</h3>
                </div>
                <p className="text-gray-600">Your profile will go live and start receiving bookings from patients</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-2">You can update your profile anytime from your dashboard</p>
          <button
            onClick={() => window.location.href = 'mailto:admin@findrhealth.com'}
            className="text-teal-600 font-medium hover:text-teal-700 hover:underline"
          >
            Questions? Contact our support team
          </button>
        </div>
      </div>
    </div>
  );
}
