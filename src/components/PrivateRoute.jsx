import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../contexts/auth';

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);

  return authContext.token ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;
