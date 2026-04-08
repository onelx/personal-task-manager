import { useMemo } from 'react';
import { Task, Priority } from '@/types/task';
import { sortTasks, filterByStatus, filterByPriority, filterBySearch } from '@/lib/taskUtils';

// Filter state type
export interface FilterState {
  status: 'all' | 'pending' | 'completed';
  priority: 'all' | Priority;
  search: string;
}

// Hook to compute filtered and sorted tasks
export function useTaskFilters(tasks: Task[], filters: FilterState): Task[] {
  return useMemo(() => {
    let result = tasks;
    
    // Apply status filter
    result = filterByStatus(result, filters.status);
    
    // Apply priority filter
    result = filterByPriority(result, filters.priority);
    
    // Apply search filter
    result = filterBySearch(result, filters.search);
    
    // Sort the results
    result = sortTasks(result);
    
    return result;
  }, [tasks, filters.status, filters.priority, filters.search]);
}