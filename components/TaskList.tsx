'use client';

import { Task } from '@/types';
import { useTaskFilters } from '@/hooks/useTaskFilters';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

export default function TaskList({ onEditTask }: TaskListProps) {
  const { filteredTasks, hasActiveFilters, totalFiltered } = useTaskFilters();

  // Show empty state if no tasks
  if (filteredTasks.length === 0) {
    return <EmptyState hasFilters={hasActiveFilters} />;
  }

  return (
    <div className="space-y-3">
      {/* Results count */}
      {hasActiveFilters && (
        <p className="text-sm text-gray-500">
          Showing {totalFiltered} {totalFiltered === 1 ? 'task' : 'tasks'}
        </p>
      )}

      {/* Task cards */}
      <div className="space-y-2">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}
      </div>
    </div>
  );
}