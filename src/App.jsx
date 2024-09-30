import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Route with Sidebar */}
        <Route path="/home" element={<Home />} />

        {/* Blog Route */}
        <Route path="/blog" element={<BlogPage />} />

        {/* Users Route */}
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
