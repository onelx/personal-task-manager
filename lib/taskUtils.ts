import { Task, Priority } from '@/types/task';

// Priority weight for sorting (higher = more important)
const PRIORITY_WEIGHT: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

// Sort tasks by completion status, then priority, then creation date
export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    // Incomplete tasks first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then by priority (high to low)
    const priorityDiff = PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

// Filter tasks by status
export function filterByStatus(tasks: Task[], status: 'all' | 'pending' | 'completed'): Task[] {
  if (status === 'all') return tasks;
  if (status === 'pending') return tasks.filter(t => !t.completed);
  if (status === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}

// Filter tasks by priority
export function filterByPriority(tasks: Task[], priority: 'all' | Priority): Task[] {
  if (priority === 'all') return tasks;
  return tasks.filter(t => t.priority === priority);
}

// Filter tasks by search query
export function filterBySearch(tasks: Task[], query: string): Task[] {
  if (!query.trim()) return tasks;
  
  const lowerQuery = query.toLowerCase();
  return tasks.filter(t => 
    t.title.toLowerCase().includes(lowerQuery) ||
    (t.description && t.description.toLowerCase().includes(lowerQuery))
  );
}

// Get priority label with color class
export function getPriorityLabel(priority: Priority): { label: string; colorClass: string } {
  const labels: Record<Priority, { label: string; colorClass: string }> = {
    high: { label: 'High', colorClass: 'bg-red-100 text-red-800' },
    medium: { label: 'Medium', colorClass: 'bg-amber-100 text-amber-800' },
    low: { label: 'Low', colorClass: 'bg-green-100 text-green-800' },
  };
  return labels[priority];
}

// Format date for display
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}