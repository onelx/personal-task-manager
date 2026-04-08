// Task priority levels
export type Priority = 'low' | 'medium' | 'high';

// Task status filter options
export type StatusFilter = 'all' | 'pending' | 'completed';

// Main task interface
export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: Priority;
  createdAt: string; // ISO string
  completedAt: string | null; // ISO string
}

// App settings interface
export interface Settings {
  theme: 'light' | 'dark' | 'system';
  defaultPriority: Priority;
  showCompleted: boolean;
}

// Filter state interface
export interface FilterState {
  status: StatusFilter;
  priority: Priority | 'all';
  searchQuery: string;
}

// Task form data (for creation/editing)
export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
}