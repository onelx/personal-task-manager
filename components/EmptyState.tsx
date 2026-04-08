'use client';

import { useTaskStore } from '@/hooks/useTaskStore';

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
}

export default function EmptyState({ hasFilters, onClearFilters }: EmptyStateProps) {
  const clearFilters = useTaskStore(state => state.clearFilters);

  const handleClearFilters = () => {
    clearFilters();
    onClearFilters?.();
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Illustration */}
      <div className="w-32 h-32 mb-6 text-gray-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="w-full h-full"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 12l2 2 4-4" />
          <line x1="3" y1="9" x2="21" y2="9" />
        </svg>
      </div>

      {/* Message */}
      {hasFilters ? (
        <>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tasks match your filters
          </h3>
          <p className="text-gray-500 text-center mb-6 max-w-sm">
            Try adjusting your search or filter criteria to find what you&apos;re looking for.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Clear all filters
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tasks yet
          </h3>
          <p className="text-gray-500 text-center mb-6 max-w-sm">
            Get started by adding your first task. Use the input above or the &quot;New Task&quot; button to create one.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span>Type in the quick add box above to get started</span>
          </div>
        </>
      )}
    </div>
  );
}