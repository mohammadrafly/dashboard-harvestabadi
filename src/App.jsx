import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Private routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="profile/:email" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
