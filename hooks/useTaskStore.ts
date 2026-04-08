import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Task, Priority, FilterState, TaskFormData } from '@/types';

// Store state interface
interface TaskStore {
  // Data
  tasks: Task[];
  filters: FilterState;
  
  // Task CRUD actions
  addTask: (data: TaskFormData) => void;
  updateTask: (id: string, data: Partial<TaskFormData>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  
  // Filter actions
  setStatusFilter: (status: FilterState['status']) => void;
  setPriorityFilter: (priority: FilterState['priority']) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

// Default filter state
const defaultFilters: FilterState = {
  status: 'all',
  priority: 'all',
  searchQuery: '',
};

// Create the store with persistence
export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      // Initial state
      tasks: [],
      filters: defaultFilters,

      // Add a new task
      addTask: (data: TaskFormData) => {
        const newTask: Task = {
          id: nanoid(),
          title: data.title.trim(),
          description: data.description.trim() || null,
          completed: false,
          priority: data.priority,
          createdAt: new Date().toISOString(),
          completedAt: null,
        };
        set(state => ({ tasks: [newTask, ...state.tasks] }));
      },

      // Update an existing task
      updateTask: (id: string, data: Partial<TaskFormData>) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? {
                  ...task,
                  ...(data.title !== undefined && { title: data.title.trim() }),
                  ...(data.description !== undefined && { 
                    description: data.description.trim() || null 
                  }),
                  ...(data.priority !== undefined && { priority: data.priority }),
                }
              : task
          ),
        }));
      },

      // Delete a task
      deleteTask: (id: string) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id),
        }));
      },

      // Toggle task completion status
      toggleComplete: (id: string) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                  completedAt: !task.completed ? new Date().toISOString() : null,
                }
              : task
          ),
        }));
      },

      // Filter actions
      setStatusFilter: (status) => {
        set(state => ({ filters: { ...state.filters, status } }));
      },

      setPriorityFilter: (priority) => {
        set(state => ({ filters: { ...state.filters, priority } }));
      },

      setSearchQuery: (searchQuery) => {
        set(state => ({ filters: { ...state.filters, searchQuery } }));
      },

      clearFilters: () => {
        set({ filters: defaultFilters });
      },
    }),
    {
      name: 'ptm-tasks', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }), // Only persist tasks, not filters
    }
  )
);