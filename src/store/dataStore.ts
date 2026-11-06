// Store dati: carica e gestisce i task via API (Milestone 1).
// Le altre entità verranno aggiunte nelle milestone successive.
import { create } from 'zustand';
import { api, ApiError } from '@/lib/api';
import type { Task } from '@/lib/types';
import { useUiStore } from './uiStore';

interface DataState {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  createTask: (data: Partial<Task>) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

function handleError(e: unknown) {
  const message =
    e instanceof ApiError ? e.message : 'Errore di connessione al server locale';
  useUiStore.getState().setError(message);
}

export const useDataStore = create<DataState>((set, get) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const tasks = await api.get<Task[]>('/api/tasks');
      set({ tasks, loading: false });
    } catch (e) {
      handleError(e);
      set({ loading: false });
    }
  },

  createTask: async (data) => {
    try {
      const task = await api.post<Task>('/api/tasks', data);
      set({ tasks: [task, ...get().tasks] });
    } catch (e) {
      handleError(e);
    }
  },

  updateTask: async (id, data) => {
    try {
      const task = await api.put<Task>(`/api/tasks/${id}`, data);
      set({ tasks: get().tasks.map((t) => (t.id === id ? task : t)) });
    } catch (e) {
      handleError(e);
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      set({ tasks: get().tasks.filter((t) => t.id !== id) });
    } catch (e) {
      handleError(e);
    }
  },
}));
