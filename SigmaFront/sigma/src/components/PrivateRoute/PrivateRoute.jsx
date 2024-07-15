import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;