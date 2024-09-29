import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './pages/Dashboard';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Route with Sidebar */}
        <Route path="/dashboard" element={<DashboardLayout />} />

        {/* Blog Route */}
        <Route path="/blog" element={<BlogPage />} />

        {/* Users Route */}
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
