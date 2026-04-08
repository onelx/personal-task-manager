'use client';

import { useState, useEffect, useCallback } from 'react';
import { getFromStorage, setToStorage } from '@/lib/storage';

// Generic hook for syncing state with localStorage
export function useLocalStorage<T>(key: string, defaultValue: T) {
  // State to hold the value
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load initial value from localStorage
  useEffect(() => {
    const stored = getFromStorage(key, defaultValue);
    setValue(stored);
    setIsLoaded(true);
  }, [key, defaultValue]);
  
  // Update localStorage when value changes
  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const valueToStore = newValue instanceof Function ? newValue(prev) : newValue;
      setToStorage(key, valueToStore);
      return valueToStore;
    });
  }, [key]);
  
  return [value, setStoredValue, isLoaded] as const;
}