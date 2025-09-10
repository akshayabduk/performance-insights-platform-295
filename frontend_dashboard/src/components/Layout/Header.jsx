import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NotificationsMenu from '../Notifications/NotificationsMenu';

// PUBLIC_INTERFACE
export default function Header() {
  /** Top header with theme toggle, notifications, and user menu. */
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-box" role="search">
          <input placeholder="Search..." aria-label="Search" />
        </div>
      </div>
      <div className="header-right">
        <button
          className="btn-secondary"
          onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          type="button"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <NotificationsMenu />
        <div className="user-menu">
          <span className="avatar" aria-hidden>👤</span>
          <div className="user-info">
            <div className="user-name">{user?.name || 'User'}</div>
            <div className="user-role">{user?.role || ''}</div>
          </div>
          <button className="btn-link" type="button" onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
