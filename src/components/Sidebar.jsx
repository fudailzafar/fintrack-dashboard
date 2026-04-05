import { useMemo } from 'react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Sun,
  Moon,
  Shield,
  Eye,
  ChevronDown,
  Wallet,
  Menu,
  X,
} from 'lucide-react';
import useStore from '../store/useStore';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const { activePage, setActivePage, role, setRole, theme, toggleTheme } = useStore();

  const handleNav = (id) => {
    setActivePage(id);
    onMobileClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={onMobileClose} />}

      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        {/* Logo */}
        <div className="sidebar__brand">
          <div className="sidebar__logo">
            <Wallet size={22} />
          </div>
          <span className="sidebar__title">FinTrack</span>
          <button className="sidebar__close-mobile" onClick={onMobileClose}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar__nav">
          <span className="sidebar__label">Menu</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                className={`sidebar__link ${activePage === item.id ? 'sidebar__link--active' : ''}`}
                onClick={() => handleNav(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div className="sidebar__footer">
          {/* Role switcher */}
          <div className="sidebar__control">
            <span className="sidebar__label">Role</span>
            <div className="sidebar__role-switch">
              <button
                id="role-admin"
                className={`sidebar__role-btn ${role === 'admin' ? 'sidebar__role-btn--active' : ''}`}
                onClick={() => setRole('admin')}
              >
                <Shield size={14} />
                Admin
              </button>
              <button
                id="role-viewer"
                className={`sidebar__role-btn ${role === 'viewer' ? 'sidebar__role-btn--active' : ''}`}
                onClick={() => setRole('viewer')}
              >
                <Eye size={14} />
                Viewer
              </button>
            </div>
          </div>

          {/* Theme toggle */}
          <button id="theme-toggle" className="sidebar__theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
