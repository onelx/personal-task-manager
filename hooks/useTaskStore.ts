'use client';

import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { Task, Priority } from '@/types/task';
import { tasksStorage } from '@/lib/storage';

// Task store state and actions
interface TaskStore {
  tasks: Task[];
  isLoaded: boolean;
  
  // Actions
  loadTasks: () => void;
  addTask: (data: { title: string; description?: string | null; priority?: Priority }) => void;
  updateTask: (id: string, data: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoaded: false,
  
  // Load tasks from localStorage on init
  loadTasks: () => {
    const tasks = tasksStorage.get();
    set({ tasks, isLoaded: true });
  },
  
  // Add a new task
  addTask: (data) => {
    const newTask: Task = {
      id: nanoid(),
      title: data.title,
      description: data.description || null,
      completed: false,
      priority: data.priority || 'medium',
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    
    const tasks = [newTask, ...get().tasks];
    tasksStorage.set(tasks);
    set({ tasks });
  },
  
  // Update an existing task
  updateTask: (id, data) => {
    const tasks = get().tasks.map(task => {
      if (task.id !== id) return task;
      
      const updated = { ...task, ...data };
      
      // Update completedAt if completion status changed
      if (data.completed !== undefined && data.completed !== task.completed) {
        updated.completedAt = data.completed ? new Date().toISOString() : null;
      }
      
      return updated;
    });
    
    tasksStorage.set(tasks);
    set({ tasks });
  },
  
  // Delete a task
  deleteTask: (id) => {
    const tasks = get().tasks.filter(task => task.id !== id);
    tasksStorage.set(tasks);
    set({ tasks });
  },
  
  // Toggle task completion
  toggleComplete: (id) => {
    const tasks = get().tasks.map(task => {
      if (task.id !== id) return task;
      
      const completed = !task.completed;
      return {
        ...task,
        completed,
        completedAt: completed ? new Date().toISOString() : null,
      };
    });
    
    tasksStorage.set(tasks);
    set({ tasks });
  },
  
  // Clear all completed tasks
  clearCompleted: () => {
    const tasks = get().tasks.filter(task => !task.completed);
    tasksStorage.set(tasks);
    set({ tasks });
  },
}));

// Hook to initialize store on client side
export function useInitTaskStore() {
  const { isLoaded, loadTasks } = useTaskStore();
  
  if (!isLoaded && typeof window !== 'undefined') {
    loadTasks();
  }
}