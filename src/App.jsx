import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard">
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="users" element={<UserPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
