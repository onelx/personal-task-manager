'use client';

import { useState, useCallback, KeyboardEvent } from 'react';
import { useTaskStore } from '@/hooks/useTaskStore';

export default function QuickAddTask() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const addTask = useTaskStore(state => state.addTask);

  const handleSubmit = useCallback(async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || isLoading) return;

    setIsLoading(true);
    
    // Add task with default priority
    addTask({
      title: trimmedTitle,
      description: '',
      priority: 'medium',
    });

    setTitle('');
    setIsLoading(false);
  }, [title, isLoading, addTask]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a quick task... (press Enter)"
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {/* Keyboard hint */}
        {title.trim() && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded">
              Enter ↵
            </kbd>
          </div>
        )}
      </div>
      
      {/* Submit button (visible on mobile or as alternative) */}
      <button
        onClick={handleSubmit}
        disabled={!title.trim() || isLoading}
        className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        aria-label="Add task"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="hidden sm:inline">Add</span>
      </button>
    </div>
  );
}