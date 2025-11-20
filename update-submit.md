# UPDATE INSTRUCTIONS FOR CompleteProfile.tsx

## Step 1: Update the handleSubmit function

Find the `handleSubmit` function (around line 300) and replace it with this:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const newErrors: any = {};
  
  if (!practiceName.trim()) newErrors.practiceName = 'Required';
  if (selectedTypes.length === 0) newErrors.providerTypes = 'Select at least one';
  if (!phone.trim()) newErrors.phone = 'Required';
  if (!email.trim()) newErrors.email = 'Required';
  if (!street.trim()) newErrors.street = 'Required';
  if (!city.trim()) newErrors.city = 'Required';
  if (!state) newErrors.state = 'Required';
  if (!zip.trim()) newErrors.zip = 'Required';
  if (photos.length === 0) newErrors.photos = 'Upload at least 1 photo';
  if (selectedServices.length < 2) newErrors.services = 'Select at least 2 services';
  if (!signature.trim()) newErrors.signature = 'Signature required';
  if (!agreedToTerms) newErrors.terms = 'Must agree to terms';

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  setLoading(true);

  try {
    const businessDataStr = sessionStorage.getItem('businessData');
    const businessData = businessDataStr ? JSON.parse(businessDataStr) : {};

    const servicesData = getAvailableServices()
      .filter(s => selectedServices.includes(s.id))
      .map(service => {
        const details = getServiceDetails(service);
        return {
          id: service.id,
          name: service.name,
          category: service.category,
          duration: details.duration,
          price: details.price
        };
      });

    const profileData = {
      placeId: businessData.placeId,
      practiceName,
      providerTypes: selectedTypes,
      phone,
      email,
      address: { street, suite, city, state, zip },
      website,
      photos,
      services: servicesData,
      optionalInfo: {
        licenseNumber,
        licenseState,
        yearsExperience: yearsExperience ? parseInt(yearsExperience) : undefined,
        education
      },
      teamMembers,
      agreement: {
        signature,
        title: '',
        agreedDate: new Date().toISOString(),
        version: '2025'
      }
    };

    const result = await submitProviderProfile(profileData);

    if (result.providerId) {
      sessionStorage.setItem('providerId', result.providerId);
    }

    sessionStorage.removeItem('businessData');
    sessionStorage.removeItem('selectedPlace');
    localStorage.removeItem('onboardingData');

    navigate('/complete');

  } catch (error: any) {
    console.error('Submission error:', error);
    alert('Failed to submit profile: ' + (error.message || 'Unknown error'));
    setLoading(false);
  }
};
```
