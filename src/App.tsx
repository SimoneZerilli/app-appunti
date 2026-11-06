import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { TodosPage } from '@/pages/TodosPage';
import { GymPage } from '@/pages/GymPage';
import { MediaPage } from '@/pages/MediaPage';
import { ReadingsPage } from '@/pages/ReadingsPage';
import { IdeasPage } from '@/pages/IdeasPage';
import { RemindersPage } from '@/pages/RemindersPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { TrashPage } from '@/pages/TrashPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { useUiStore } from '@/store/uiStore';

/** Banner di errore globale con messaggi comprensibili. */
function ErrorBanner() {
  const errorMessage = useUiStore((s) => s.errorMessage);
  const setError = useUiStore((s) => s.setError);
  if (!errorMessage) return null;
  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between gap-4 bg-red-900/90 px-4 py-2 text-sm text-red-100">
      <span>⚠️ {errorMessage}</span>
      <button onClick={() => setError(null)} className="shrink-0 font-medium hover:text-white">
        Chiudi
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBanner />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/todo" element={<TodosPage />} />
          <Route path="/palestra" element={<GymPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/letture" element={<ReadingsPage />} />
          <Route path="/idee" element={<IdeasPage />} />
          <Route path="/reminder" element={<RemindersPage />} />
          <Route path="/progetti" element={<ProjectsPage />} />
          <Route path="/cestino" element={<TrashPage />} />
          <Route path="/impostazioni" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
