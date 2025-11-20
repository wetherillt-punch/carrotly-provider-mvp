import { useState, useEffect } from 'react';
import { Provider } from '../types';

const STORAGE_KEY = 'carrotly_provider';

export const useProviderData = () => {
  const [provider, setProvider] = useState<Partial<Provider> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProvider(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing stored provider data:', e);
      }
    }
  }, []);

  const updateProvider = (data: Partial<Provider>) => {
    const updated = { ...provider, ...data };
    setProvider(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearProvider = () => {
    setProvider(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { provider, updateProvider, clearProvider };
};
