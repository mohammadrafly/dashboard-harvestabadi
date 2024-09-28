import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './pages/Dashboard';

const Dashboard = () => {
  return <h1 className="text-3xl font-bold">Dashboard Content</h1>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Route with Sidebar */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* Add more routes under the dashboard as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
