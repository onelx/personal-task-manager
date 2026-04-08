import { useMemo } from 'react';
import { useTaskStore } from './useTaskStore';
import { applyFilters, getTaskStats } from '@/lib/taskUtils';

// Hook that computes filtered tasks based on current filter state
export function useTaskFilters() {
  const tasks = useTaskStore(state => state.tasks);
  const filters = useTaskStore(state => state.filters);

  // Compute filtered tasks (memoized for performance)
  const filteredTasks = useMemo(() => {
    return applyFilters(tasks, filters);
  }, [tasks, filters]);

  // Compute task statistics
  const stats = useMemo(() => {
    return getTaskStats(tasks);
  }, [tasks]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.status !== 'all' ||
      filters.priority !== 'all' ||
      filters.searchQuery.trim() !== ''
    );
  }, [filters]);

  return {
    filteredTasks,
    stats,
    hasActiveFilters,
    totalFiltered: filteredTasks.length,
  };
}