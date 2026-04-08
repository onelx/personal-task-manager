'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import { getPriorityLabel, formatDate } from '@/lib/taskUtils';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

// Individual task card with checkbox, title, priority, and inline actions
export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const priorityInfo = getPriorityLabel(task.priority);
  
  // Handle delete with confirmation
  const handleDelete = () => {
    if (isDeleting) {
      onDelete(task.id);
    } else {
      setIsDeleting(true);
      // Reset confirmation after 3 seconds
      setTimeout(() => setIsDeleting(false), 3000);
    }
  };
  
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition-all',
        task.completed && 'opacity-60'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={clsx(
            'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors mt-0.5',
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-primary-500'
          )}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={clsx(
                'font-medium text-gray-900',
                task.completed && 'line-through text-gray-500'
              )}
            >
              {task.title}
            </h3>
            <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', priorityInfo.colorClass)}>
              {priorityInfo.label}
            </span>
          </div>
          
          {task.description && (
            <p className={clsx('text-sm text-gray-600 mt-1', task.completed && 'text-gray-400')}>
              {task.description}
            </p>
          )}
          
          <p className="text-xs text-gray-400 mt-2">
            Created {formatDate(task.createdAt)}
            {task.completedAt && ` • Completed ${formatDate(task.completedAt)}`}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className={clsx(
              'p-2 rounded-lg transition-colors',
              isDeleting
                ? 'text-white bg-red-600 hover:bg-red-700'
                : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'
            )}
            aria-label={isDeleting ? 'Click again to confirm delete' : 'Delete task'}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}