import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import BlogPage from './pages/BlogPage';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import AddArticle from './pages/blog/AddArtikel';
import EditArticle from './pages/blog/EditArtikel';
import ProjectsPage from './pages/ProjectsPage';
import AddProject from './pages/project/AddProject';
import EditProject from './pages/project/EditProject';
import DesignsPage from './pages/DesignPage';
import AddDesign from './pages/design/AddDesign';
import EditDesign from './pages/design/EditDesign';
import Settings from './pages/Setting';
import DashboardLayout from './layouts/DashboardLayout'; // Ensure you import this

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  useEffect(() => {
    const mode = localStorage.getItem('darkMode');
    if (mode) setIsDarkMode(mode === 'true');
  }, []);

  return (
    <Router>
      <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route
              element={
                <DashboardLayout
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              }
            >
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="blog" element={<BlogPage isDarkMode={isDarkMode} />} />
              <Route path="blog/add" element={<AddArticle />} />
              <Route path="blog/edit/:id" element={<EditArticle />} />
              <Route path="projects" element={<ProjectsPage isDarkMode={isDarkMode} />} />
              <Route path="projects/add" element={<AddProject />} />
              <Route path="projects/edit/:id" element={<EditProject />} />
              <Route path="designs" element={<DesignsPage isDarkMode={isDarkMode} />} />
              <Route path="designs/add" element={<AddDesign />} />
              <Route path="designs/edit/:id" element={<EditDesign />} />
              <Route path="profile/:email" element={<Profile isDarkMode={isDarkMode} />} />
              <Route path="settings" element={<Settings isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
