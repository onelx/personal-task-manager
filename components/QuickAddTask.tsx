'use client';

import { useState } from 'react';
import { Priority } from '@/types/task';

interface QuickAddTaskProps {
  onAdd: (data: { title: string; priority?: Priority }) => void;
}

// Quick add input for adding tasks inline without opening modal
export function QuickAddTask({ onAdd }: QuickAddTaskProps) {
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onAdd({ title: title.trim() });
    setTitle('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          {/* Plus icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className={`h-5 w-5 transition-colors ${isFocused ? 'text-primary-500' : 'text-gray-400'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Quick add a task... (press Enter)"
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
          />
        </div>
        
        <button
          type="submit"
          disabled={!title.trim()}
          className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
      
      {/* Helper text */}
      {isFocused && (
        <p className="text-xs text-gray-500 mt-2 ml-1">
          Tip: Press Enter to add quickly. Click "New Task" button for more options.
        </p>
      )}
    </form>
  );
}