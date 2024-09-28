import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full bg-white shadow-lg rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
