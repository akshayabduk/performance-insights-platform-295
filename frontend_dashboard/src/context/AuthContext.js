import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser, login as apiLogin } from '../api/client';

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication state and actions (login/logout) to the app. */
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  // Initialize current user if token exists
  useEffect(() => {
    async function init() {
      if (!token) {
        setInitializing(false);
        return;
      }
      try {
        setLoading(true);
        const me = await getCurrentUser();
        setUser(me);
        localStorage.setItem('auth_user', JSON.stringify(me));
      } catch (e) {
        // Token invalid or server unreachable
        // Reset state but keep UX responsive
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
        setInitializing(false);
      }
    }
    init();
  }, [token]);

  // PUBLIC_INTERFACE
  async function login(email, password) {
    /** Authenticate the user using email/password and store token+profile. */
    setError(null);
    setLoading(true);
    try {
      const { token: tkn, user: profile } = await apiLogin(email, password);
      localStorage.setItem('auth_token', tkn);
      localStorage.setItem('auth_user', JSON.stringify(profile));
      setToken(tkn);
      setUser(profile);
      return { success: true, user: profile };
    } catch (e) {
      setError(e?.response?.data?.message || 'Login failed');
      return { success: false, error: e };
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  function logout() {
    /** Clear authentication state and storage. */
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({ token, user, loading, initializing, error, login, logout }),
    [token, user, loading, initializing, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access authentication state and actions. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
