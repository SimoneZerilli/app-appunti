import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '@/lib/constants';

/** Barra di navigazione inferiore per mobile (prime 5 voci + menu). */
export function MobileNav() {
  const items = NAV_ITEMS.slice(0, 5);
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border-soft bg-surface-2 lg:hidden">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center py-2 text-[11px] ${
              isActive ? 'text-accent' : 'text-zinc-500'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
