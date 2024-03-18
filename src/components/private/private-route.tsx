import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  path?: string;
  children: React.ReactNode,
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken') ? true : false;

  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;

};

export default PrivateRoute;
