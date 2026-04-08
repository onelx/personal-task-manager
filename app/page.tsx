'use client';

import { useState } from 'react';
import { TaskList } from '@/components/TaskList';
import { FilterBar } from '@/components/FilterBar';
import { SearchInput } from '@/components/SearchInput';
import { QuickAddTask } from '@/components/QuickAddTask';
import { TaskForm } from '@/components/TaskForm';
import { useTaskStore } from '@/hooks/useTaskStore';
import { useTaskFilters, FilterState } from '@/hooks/useTaskFilters';
import { Task } from '@/types/task';

// Main page component - Dashboard with task list and actions
export default function Home() {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTaskStore();
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    priority: 'all',
    search: '',
  });
  
  // Modal state for editing tasks
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Get filtered tasks
  const filteredTasks = useTaskFilters(tasks, filters);
  
  // Stats for header
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  
  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  // Handle task edit
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };
  
  // Handle form submit
  const handleFormSubmit = (data: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };
  
  // Handle form close
  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };
  
  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
              <p className="text-sm text-gray-500">Total Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{completedCount}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-600">{pendingCount}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn-primary"
          >
            <span className="mr-2">+</span>
            New Task
          </button>
        </div>
      </div>
      
      {/* Quick add task */}
      <QuickAddTask onAdd={addTask} />
      
      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4">
        <SearchInput
          value={filters.search}
          onChange={(search) => handleFilterChange({ search })}
        />
        <FilterBar
          filters={filters}
          onChange={handleFilterChange}
        />
      </div>
      
      {/* Task list */}
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={toggleComplete}
        onEdit={handleEdit}
        onDelete={deleteTask}
      />
      
      {/* Task form modal */}
      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}