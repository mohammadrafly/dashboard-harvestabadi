import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  //const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout>
      <div className="flex h-screen">
        <div className="w-1/2 flex justify-center items-center mx-auto">
          <form onSubmit={handleLogin} className="space-y-4 w-[500px]">
            <div className="text-[#00C2FF] text-4xl">
              HARVEST
              <span className="font-bold">ABADI</span>
            </div>
            <div className="font-semibold text-2xl">
              Welcome back!
            </div>
            <div className="font-light text-normal">
              Enter your credentials to access the dashboard
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Show Password</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#00C2FF] text-white font-bold rounded-md hover:bg-[#3caacc] transition"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="w-1/2 md:flex items-center justify-center bg-cover bg-center bg-[#00C2FF] hidden">
          <img src="images/loginimg.png" alt=""></img>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
