import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar with main navigation links, styled for minimal/light theme. */
  const { user } = useAuth();
  const active = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

  return (
    <aside className="sidebar">
      <div className="brand">Performance Insights</div>
      <nav className="nav">
        <NavLink end to="/" className={active}>
          <span className="icon">🏠</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/history" className={active}>
          <span className="icon">📈</span>
          <span>Performance History</span>
        </NavLink>
        <NavLink to="/reports" className={active}>
          <span className="icon">📄</span>
          <span>Reports</span>
        </NavLink>
        {user?.role === ROLES.ADMIN && (
          <NavLink to="/admin" className={active}>
            <span className="icon">🛠️</span>
            <span>Admin</span>
          </NavLink>
        )}
      </nav>
      <div className="sidebar-footer">
        <div className="role-pill">{user?.role?.toUpperCase() || 'GUEST'}</div>
      </div>
    </aside>
  );
}
