'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTaskStore } from '@/hooks/useTaskStore';

// Debounce delay in milliseconds
const DEBOUNCE_DELAY = 300;

export default function SearchInput() {
  const searchQuery = useTaskStore(state => state.filters.searchQuery);
  const setSearchQuery = useTaskStore(state => state.setSearchQuery);
  
  // Local state for immediate UI feedback
  const [localValue, setLocalValue] = useState(searchQuery);

  // Sync local state when store changes (e.g., clear filters)
  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  // Debounced update to store
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== searchQuery) {
        setSearchQuery(localValue);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [localValue, searchQuery, setSearchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleClear = useCallback(() => {
    setLocalValue('');
    setSearchQuery('');
  }, [setSearchQuery]);

  return (
    <div className="relative">
      {/* Search icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input field */}
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow text-sm"
      />

      {/* Clear button */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}