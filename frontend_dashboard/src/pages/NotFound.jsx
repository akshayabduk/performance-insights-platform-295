import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFound() {
  /** Fallback page for unknown routes. */
  return (
    <div className="card">
      <div className="card-title">Page Not Found</div>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn-secondary">Back to dashboard</Link>
    </div>
  );
}
