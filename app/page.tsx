'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { useTaskFilters } from '@/hooks/useTaskFilters';
import QuickAddTask from '@/components/QuickAddTask';
import SearchInput from '@/components/SearchInput';
import FilterBar from '@/components/FilterBar';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';

export default function Home() {
  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Get task statistics
  const { stats } = useTaskFilters();

  // Open form for new task
  const handleNewTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  // Open form for editing
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  // Close form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {stats.pending > 0 ? (
                  <>
                    {stats.pending} pending
                    {stats.highPriority > 0 && (
                      <span className="text-red-600"> • {stats.highPriority} high priority</span>
                    )}
                  </>
                ) : stats.total > 0 ? (
                  'All tasks completed! 🎉'
                ) : (
                  'No tasks yet'
                )}
              </p>
            </div>
            <button
              onClick={handleNewTask}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Quick add */}
        <section className="mb-6">
          <QuickAddTask />
        </section>

        {/* Stats cards */}
        {stats.total > 0 && (
          <section className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-xs text-gray-500 mt-1">Total Tasks</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-gray-500 mt-1">Completed</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">{stats.completionRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Progress</div>
            </div>
          </section>
        )}

        {/* Filters and search */}
        <section className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchInput />
          </div>
          <FilterBar />
        </section>

        {/* Task list */}
        <section>
          <TaskList onEditTask={handleEditTask} />
        </section>
      </div>

      {/* Task form modal */}
      <TaskForm
        task={editingTask}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
      />
    </main>
  );
}