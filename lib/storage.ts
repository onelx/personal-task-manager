// localStorage wrapper with JSON serialization and error handling

const TASKS_KEY = 'ptm-tasks';
const SETTINGS_KEY = 'ptm-settings';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Generic get function with type safety
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (!isBrowser) return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

// Generic set function
export function setToStorage<T>(key: string, value: T): boolean {
  if (!isBrowser) return false;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
}

// Remove item from storage
export function removeFromStorage(key: string): boolean {
  if (!isBrowser) return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
}

// Specific helpers for tasks
export const tasksStorage = {
  key: TASKS_KEY,
  get: <T>(defaultValue: T) => getFromStorage<T>(TASKS_KEY, defaultValue),
  set: <T>(value: T) => setToStorage(TASKS_KEY, value),
  clear: () => removeFromStorage(TASKS_KEY),
};

// Specific helpers for settings
export const settingsStorage = {
  key: SETTINGS_KEY,
  get: <T>(defaultValue: T) => getFromStorage<T>(SETTINGS_KEY, defaultValue),
  set: <T>(value: T) => setToStorage(SETTINGS_KEY, value),
  clear: () => removeFromStorage(SETTINGS_KEY),
};