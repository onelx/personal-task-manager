'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { useTaskStore } from '@/hooks/useTaskStore';
import { getPriorityInfo, formatDate } from '@/lib/taskUtils';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const toggleComplete = useTaskStore(state => state.toggleComplete);
  const deleteTask = useTaskStore(state => state.deleteTask);

  const priorityInfo = getPriorityInfo(task.priority);

  const handleToggle = () => {
    toggleComplete(task.id);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 150));
    deleteTask(task.id);
  };

  return (
    <div
      className={clsx(
        'group bg-white border rounded-lg p-4 transition-all hover:shadow-md',
        task.completed ? 'border-gray-200 bg-gray-50' : 'border-gray-200',
        isDeleting && 'opacity-50 scale-95'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={clsx(
            'flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 transition-colors flex items-center justify-center',
            task.completed
              ? 'bg-primary-600 border-primary-600 text-white'
              : 'border-gray-300 hover:border-primary-500'
          )}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={clsx(
                'font-medium text-gray-900 break-words',
                task.completed && 'line-through text-gray-500'
              )}
            >
              {task.title}
            </h3>
            {/* Priority badge */}
            <span
              className={clsx(
                'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full',
                priorityInfo.bg,
                priorityInfo.color
              )}
            >
              {priorityInfo.label}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p
              className={clsx(
                'mt-1 text-sm text-gray-600 break-words',
                task.completed && 'line-through text-gray-400'
              )}
            >
              {task.description}
            </p>
          )}

          {/* Meta info */}
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
            <span>Created {formatDate(task.createdAt)}</span>
            {task.completedAt && (
              <span>• Completed {formatDate(task.completedAt)}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            aria-label="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
            aria-label="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}