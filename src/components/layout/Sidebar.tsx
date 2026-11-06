import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '@/lib/constants';
import { useUiStore } from '@/store/uiStore';

/** Navigazione laterale per desktop. */
export function Sidebar() {
  const closeSidebar = useUiStore((s) => s.closeSidebar);
  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-border-soft bg-surface-2">
      <div className="px-4 py-5">
        <h1 className="text-lg font-bold tracking-tight">
          MyLife <span className="text-accent">Hub</span>
        </h1>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-surface-3 font-medium text-white'
                  : 'text-zinc-400 hover:bg-surface-3 hover:text-zinc-100'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <p className="px-4 py-4 text-xs text-zinc-600">Single-user · dati locali</p>
    </aside>
  );
}
