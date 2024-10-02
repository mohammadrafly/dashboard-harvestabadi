import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './partials/Sidebar';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';

const DashboardLayout = ({ title, isDarkMode, toggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(() => {
        const storedState = localStorage.getItem('sidebarOpen');
        return storedState ? JSON.parse(storedState) : false;
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(isOpen));
    }, [isOpen]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <Sidebar isOpen={isOpen} />

            <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64 md:ml-80' : 'ml-0'}`}>
                <header className={`p-4 shadow-md flex justify-between items-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="text-3xl focus:outline-none mr-4">
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                        <h1 className="text-xl font-bold">{title}</h1>
                    </div>
                    <button onClick={toggleDarkMode} className="text-2xl focus:outline-none">
                        {isDarkMode ? <FiSun /> : <FiMoon />}
                    </button>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
