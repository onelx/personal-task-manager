// localStorage wrapper with error handling and JSON serialization

const TASKS_KEY = 'ptm-tasks';
const SETTINGS_KEY = 'ptm-settings';

// Check if we're in the browser
const isBrowser = typeof window !== 'undefined';

// Generic get function with error handling
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

// Generic set function with error handling
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

// Task-specific helpers
export const tasksStorage = {
  get: () => getFromStorage<any[]>(TASKS_KEY, []),
  set: (tasks: any[]) => setToStorage(TASKS_KEY, tasks),
  clear: () => removeFromStorage(TASKS_KEY),
};

// Settings-specific helpers
export const settingsStorage = {
  get: () => getFromStorage(SETTINGS_KEY, {
    theme: 'system',
    defaultPriority: 'medium',
    showCompleted: true,
  }),
  set: (settings: any) => setToStorage(SETTINGS_KEY, settings),
};