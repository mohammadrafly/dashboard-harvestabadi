import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { verifyToken } from '../services/authService';
import Loading from './Loading';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await verifyToken(token);
          if (response.status === 'success') {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setErrorMessage('Session expired. Please log in again.');
            localStorage.removeItem('token');
          }
        } catch (error) {
          setIsAuthenticated(false);
          setErrorMessage('Invalid token. Please log in again.');
          localStorage.removeItem('token');
        }
      } else {
        setIsAuthenticated(false);
        setErrorMessage('You must log in to access this page.');
      }
    };

    checkAuth();
  }, [token]);

  if (isAuthenticated === null) {
    return <Loading></Loading>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ error: errorMessage }} />;
};

export default PrivateRoute;
