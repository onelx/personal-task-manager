import { Task, Priority, StatusFilter, FilterState } from '@/types';

// Priority order for sorting (higher number = higher priority)
const priorityOrder: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

// Sort tasks by priority (high to low) then by creation date (newest first)
export function sortTasksByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    // First sort by completion status (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by priority
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    // Finally by creation date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

// Sort tasks by creation date (newest first)
export function sortTasksByDate(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

// Filter tasks by status
export function filterByStatus(tasks: Task[], status: StatusFilter): Task[] {
  switch (status) {
    case 'pending':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
}

// Filter tasks by priority
export function filterByPriority(tasks: Task[], priority: Priority | 'all'): Task[] {
  if (priority === 'all') return tasks;
  return tasks.filter(task => task.priority === priority);
}

// Filter tasks by search query (searches in title and description)
export function filterBySearch(tasks: Task[], query: string): Task[] {
  if (!query.trim()) return tasks;
  const lowerQuery = query.toLowerCase().trim();
  return tasks.filter(task => {
    const titleMatch = task.title.toLowerCase().includes(lowerQuery);
    const descMatch = task.description?.toLowerCase().includes(lowerQuery) || false;
    return titleMatch || descMatch;
  });
}

// Apply all filters to tasks
export function applyFilters(tasks: Task[], filters: FilterState): Task[] {
  let filtered = tasks;
  filtered = filterByStatus(filtered, filters.status);
  filtered = filterByPriority(filtered, filters.priority);
  filtered = filterBySearch(filtered, filters.searchQuery);
  return sortTasksByPriority(filtered);
}

// Get task statistics
export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  
  return {
    total,
    completed,
    pending,
    highPriority,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

// Get priority display info
export function getPriorityInfo(priority: Priority) {
  const info = {
    high: { label: 'High', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-300' },
    medium: { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300' },
    low: { label: 'Low', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300' },
  };
  return info[priority];
}

// Format date for display
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}