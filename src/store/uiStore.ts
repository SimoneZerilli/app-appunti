// Store UI: tema, sidebar mobile, messaggi di errore globali.
import { create } from 'zustand';

interface UiState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  errorMessage: string | null;
  setError: (message: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
  errorMessage: null,
  setError: (message) => set({ errorMessage: message }),
}));
