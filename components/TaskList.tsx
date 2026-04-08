'use client';

import { useEffect } from 'react';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { EmptyState } from './EmptyState';
import { useTaskStore } from '@/hooks/useTaskStore';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

// Task list component with support for filtering and visual sorting
export function TaskList({ tasks, onToggleComplete, onEdit, onDelete }: TaskListProps) {
  const { isLoaded, loadTasks } = useTaskStore();
  
  // Load tasks on mount
  useEffect(() => {
    if (!isLoaded) {
      loadTasks();
    }
  }, [isLoaded, loadTasks]);
  
  // Show loading state
  if (!isLoaded) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-500">Loading tasks...</span>
        </div>
      </div>
    );
  }
  
  // Show empty state
  if (tasks.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}