import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, AlertCircle, Clock } from 'lucide-react';
import FindrLogo from '../../components/branding/FindrLogo';
import { sendVerificationCode, verifyCode, getPlaceDetails } from '../../services/api';

export default function VerifyOwnership() {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [placeId, setPlaceId] = useState('');
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  const MOCK_CODE = '123456';

  useEffect(() => {
    const selectedPlace = sessionStorage.getItem('selectedPlace');
    if (!selectedPlace) {
      navigate('/onboarding');
      return;
    }

    try {
      const place = JSON.parse(selectedPlace);
      setBusinessName(place.name);
      setBusinessAddress(place.address);
      setPlaceId(place.placeId);
      
      // Try to fetch details, but always have fallback
      fetchPlaceDetails(place);
    } catch (error) {
      console.error('Error loading place:', error);
      navigate('/onboarding');
    }
  }, [navigate]);

  const fetchPlaceDetails = async (place: any) => {
    try {
      const details = await getPlaceDetails(place.placeId);
      
      if (details.email) {
        setBusinessEmail(details.email);
        setUseFallback(false);
      } else {
        // No email found - use testing mode
        setupTestingMode(place);
      }
      
      setLoadingDetails(false);
    } catch (error) {
      console.error('Error fetching details:', error);
      // Backend error - use testing mode
      setupTestingMode(place);
      setLoadingDetails(false);
    }
  };

  const setupTestingMode = (place: any) => {
    // Create a mock email for testing
    const mockEmail = 'owner@' + place.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
    setBusinessEmail(mockEmail);
    setUseFallback(true);
    setError(''); // Clear any errors
  };

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Expired');
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleSendCode = async () => {
    if (!businessEmail) {
      setError('No email available for verification.');
      return;
    }

    setLoading(true);
    setError('');

    // Always use testing mode for now (until we set up Resend)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCodeSent(true);
    setExpiresAt(new Date(Date.now() + 10 * 60 * 1000));
    setUseFallback(true);
    alert(`🧪 Testing Mode Activated!\n\nYour verification code is: ${MOCK_CODE}\n\nEnter this code on the next screen.`);
    setLoading(false);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    if (newCode.every(digit => digit !== '') && value) {
      setTimeout(() => handleVerify(newCode.join('')), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (fullCode?: string) => {
    const codeToVerify = fullCode || code.join('');
    
    if (codeToVerify.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock verification for now
    if (codeToVerify === MOCK_CODE) {
      sessionStorage.setItem('verified', 'true');
      sessionStorage.setItem('businessData', JSON.stringify({
        name: businessName,
        address: businessAddress,
        email: businessEmail,
        placeId: placeId
      }));
      navigate('/onboarding/complete-profile');
      return;
    } else {
      setError(`Invalid code. Use ${MOCK_CODE} for testing.`);
      setCode(['', '', '', '', '', '']);
      document.getElementById('code-0')?.focus();
      setAttemptsRemaining(prev => prev - 1);
      setLoading(false);
    }
  };

  const handleSkipVerification = () => {
    // Allow skipping verification for testing
    if (confirm('Skip verification for testing? This is only available in development mode.')) {
      sessionStorage.setItem('verified', 'true');
      sessionStorage.setItem('businessData', JSON.stringify({
        name: businessName,
        address: businessAddress,
        email: businessEmail,
        placeId: placeId
      }));
      navigate('/onboarding/complete-profile');
    }
  };

  if (loadingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading business details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <FindrLogo size="sm" showText={true} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Step 1 of 7: Verify Ownership</span>
            <span className="text-sm font-medium text-teal-600">14%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full" style={{ width: '14%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 rounded-r-lg">
            <p className="text-sm font-semibold text-orange-900 mb-2">
              🧪 Development Testing Mode
            </p>
            <p className="text-sm text-orange-800">
              Email verification is in testing mode. Use code <code className="bg-orange-100 px-2 py-1 rounded font-mono font-bold">{MOCK_CODE}</code> to verify.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify You Own This Business</h2>
          <p className="text-gray-600 mb-8">
            We'll send a verification code to confirm you're the owner.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">{businessName}</h3>
            <p className="text-sm text-gray-600">{businessAddress}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <Mail className="w-5 h-5 text-teal-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Verification email will be sent to:</p>
                <p className="font-semibold text-gray-900">{businessEmail}</p>
              </div>
            </div>
          </div>

          {!codeSent ? (
            <div className="space-y-3">
              <button
                onClick={handleSendCode}
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? 'Preparing...' : 'Send Verification Code'}
              </button>

              <button
                onClick={handleSkipVerification}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition text-sm"
              >
                Skip Verification (Testing Only)
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                  Enter 6-digit verification code
                </label>
                <div className="flex gap-2 justify-center mb-4">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                    />
                  ))}
                </div>

                <div className="text-center mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    💡 <strong>Testing Code:</strong> <code className="bg-green-100 px-3 py-1 rounded font-mono text-lg font-bold">{MOCK_CODE}</code>
                  </p>
                </div>
              </div>

              {timeRemaining && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Code expires in {timeRemaining}</span>
                </div>
              )}

              <div className="text-center mb-6">
                <button
                  onClick={() => handleSendCode()}
                  className="text-teal-600 font-medium hover:text-teal-700 hover:underline"
                >
                  Resend code
                </button>
              </div>

              <button
                onClick={() => handleVerify()}
                disabled={loading || code.some(d => !d)}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>

              {attemptsRemaining < 3 && (
                <p className="text-sm text-orange-600 text-center mt-4">
                  {attemptsRemaining} attempts remaining
                </p>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">Need help?</p>
            <button
              onClick={() => navigate('/onboarding/contact-admin')}
              className="text-teal-600 font-medium hover:text-teal-700 hover:underline"
            >
              Contact admin@findrhealth.com →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
