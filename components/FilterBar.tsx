'use client';

import { useTaskStore } from '@/hooks/useTaskStore';
import { StatusFilter, Priority } from '@/types';
import clsx from 'clsx';

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

const priorityOptions: { value: Priority | 'all'; label: string }[] = [
  { value: 'all', label: 'Any Priority' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export default function FilterBar() {
  const filters = useTaskStore(state => state.filters);
  const setStatusFilter = useTaskStore(state => state.setStatusFilter);
  const setPriorityFilter = useTaskStore(state => state.setPriorityFilter);

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Status filter tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        {statusOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setStatusFilter(option.value)}
            className={clsx(
              'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
              filters.status === option.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Priority filter dropdown */}
      <div className="relative">
        <select
          value={filters.priority}
          onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
          className={clsx(
            'appearance-none bg-white border rounded-lg px-3 py-2 pr-8 text-sm font-medium cursor-pointer focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none',
            filters.priority !== 'all' 
              ? 'border-primary-300 text-primary-700' 
              : 'border-gray-300 text-gray-700'
          )}
        >
          {priorityOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}