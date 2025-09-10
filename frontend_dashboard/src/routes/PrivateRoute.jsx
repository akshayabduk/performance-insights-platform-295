import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function PrivateRoute({ children, allowedRoles }) {
  /** Guards routes to authenticated users and optionally enforces allowed roles. */
  const { token, user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <div style={{ padding: 24 }}>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

PrivateRoute.defaultProps = {
  allowedRoles: undefined
};
