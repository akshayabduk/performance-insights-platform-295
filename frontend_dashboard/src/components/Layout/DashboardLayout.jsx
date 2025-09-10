import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

// PUBLIC_INTERFACE
export default function DashboardLayout() {
  /** Main application shell: sidebar navigation, header, and main content area. */
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content-area">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
