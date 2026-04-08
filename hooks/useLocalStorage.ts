import { useState, useEffect, useCallback } from 'react';
import { getFromStorage, setToStorage } from '@/lib/storage';

// Generic hook for syncing state with localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate state from localStorage on mount
  useEffect(() => {
    const value = getFromStorage<T>(key, initialValue);
    setStoredValue(value);
    setIsHydrated(true);
  }, [key, initialValue]);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue(prevValue => {
      const valueToStore = value instanceof Function ? value(prevValue) : value;
      setToStorage(key, valueToStore);
      return valueToStore;
    });
  }, [key]);

  return [storedValue, setValue, isHydrated] as const;
}