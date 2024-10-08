import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { logout, verifyToken } from '../services/authService';

const ProfileIcon = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [logoutMessage, setLogoutMessage] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const isDarkMode = localStorage.getItem('darkMode') === 'true'; // Check for dark mode

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const getUserData = async () => {
            if (token) {
                try {
                    const data = await verifyToken(token);
                    setUserData(data.data);
                } catch (error) {
                    console.error('Failed to fetch user data', error);
                }
            }
        };
        getUserData();
    }, [token]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleProfileClick = () => {
        navigate(`/dashboard/profile/${userData.email}`);
    };

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to log out?')) {
            try {
                await logout(token);
                localStorage.removeItem('token');
                setLogoutMessage('Logout successful!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                console.error('Logout failed', error);
            }
        }
    };

    return (
        <div className={`relative inline-block w-full text-center px-3 py-2 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} ref={dropdownRef}>
            <button onClick={toggleDropdown} className={`flex items-center w-full text-2xl hover:text-[#00C2FF] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <AiOutlineUser className="mr-3"/>
                <span className="block text-lg">{userData?.email || 'Loading...'}</span>
            </button>

            {logoutMessage && (
                <div className="text-green-500 text-sm mt-2">{logoutMessage}</div>
            )}

            {dropdownOpen && (
                <div className={`absolute left-0 bottom-full mb-1 w-full rounded shadow-lg z-10 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
                    <div className={`px-4 py-2 cursor-pointer flex items-center hover:bg-slate-200 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-slate-200'}`} onClick={handleProfileClick}>
                        <AiOutlineUser className="mr-2" />
                        <p>Profile</p>
                    </div>
                    <div
                        className={`px-4 py-2 cursor-pointer text-red-600 flex items-center hover:bg-slate-200 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-slate-200'}`}
                        onClick={handleLogout}
                    >
                        <MdLogout className="mr-2" />
                        <p>Log Out</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;
