import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login form for email/password authentication. */
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  async function onSubmit(e) {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={onSubmit}>
        <h1 className="auth-title">Sign in to your account</h1>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </label>
        {error && <div className="error">{String(error)}</div>}
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
