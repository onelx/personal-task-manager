'use client';

import { Priority } from '@/types/task';
import { FilterState } from '@/hooks/useTaskFilters';
import clsx from 'clsx';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: Partial<FilterState>) => void;
}

// Filter bar for status and priority filtering
export function FilterBar({ filters, onChange }: FilterBarProps) {
  const statusOptions: { value: FilterState['status']; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];
  
  const priorityOptions: { value: 'all' | Priority; label: string }[] = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];
  
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Status filter */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange({ status: option.value })}
            className={clsx(
              'px-4 py-2 text-sm font-medium transition-colors',
              filters.status === option.value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      {/* Priority filter */}
      <select
        value={filters.priority}
        onChange={(e) => onChange({ priority: e.target.value as 'all' | Priority })}
        className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {priorityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}