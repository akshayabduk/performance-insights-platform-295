import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function RoleRoute({ children, roles }) {
  /** Render children only if current user's role is included in 'roles'. */
  const { user } = useAuth();
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

RoleRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired
};
