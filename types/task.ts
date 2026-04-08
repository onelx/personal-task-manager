// Task type definitions

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: Priority;
  createdAt: string; // ISO string
  completedAt: string | null; // ISO string
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  defaultPriority: Priority;
  showCompleted: boolean;
}