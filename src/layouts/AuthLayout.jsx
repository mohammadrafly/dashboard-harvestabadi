import React, { useState } from 'react';

const AuthLayout = ({ children }) => {
  const isDarkMode = useState(localStorage.getItem('darkMode') === "true");

  return (
    <div className={`min-h-screen w-full bg-gray-100 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} flex flex-col justify-center items-center`}>
      <div className={`w-full bg-white ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg rounded-lg`}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
