import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import RoleRoute from './routes/RoleRoute';
import DashboardLayout from './components/Layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PerformanceHistory from './pages/PerformanceHistory';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { ROLES } from './utils/constants';

// PUBLIC_INTERFACE
function App() {
  /** Application entry: router and route definitions for dashboard app. */
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              )}
            >
              <Route index element={<Dashboard />} />
              <Route path="history" element={<PerformanceHistory />} />
              <Route path="reports" element={<Reports />} />
              <Route
                path="admin"
                element={
                  <RoleRoute roles={[ROLES.ADMIN]}>
                    <Admin />
                  </RoleRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
