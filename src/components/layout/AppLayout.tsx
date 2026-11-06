import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { useUiStore } from '@/store/uiStore';

/** Layout principale: sidebar su desktop, navbar inferiore su mobile. */
export function AppLayout() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar mobile a scomparsa */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={toggleSidebar} />
          <div className="absolute inset-y-0 left-0">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar mobile */}
        <header className="flex items-center gap-3 border-b border-border-soft bg-surface-2 px-4 py-3 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="rounded-lg bg-surface-3 px-3 py-1.5 text-sm"
            aria-label="Apri menu"
          >
            ☰
          </button>
          <h1 className="text-base font-bold">
            MyLife <span className="text-accent">Hub</span>
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:p-8 lg:pb-8">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
