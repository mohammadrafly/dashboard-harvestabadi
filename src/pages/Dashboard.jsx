import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaUsers, FaProjectDiagram } from 'react-icons/fa';
import { MdOutlineArticle } from 'react-icons/md';
import Sidebar from '../layouts/Slidebar';

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={isOpen} />

            <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64 md:ml-80' : 'ml-0'}`}>
                <header className="bg-white p-4 shadow-md flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={toggleSidebar} className="text-3xl focus:outline-none mr-4">
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                        <h1 className="text-xl font-bold">Dashboard</h1>
                    </div>
                </header>

                <main className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">Total Users</h2>
                                <p className="text-2xl">150</p>
                            </div>
                            <FaUsers className="text-4xl text-blue-500" />
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">Total Articles</h2>
                                <p className="text-2xl">30</p>
                            </div>
                            <MdOutlineArticle className="text-4xl text-green-500" />
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">Total Projects</h2>
                                <p className="text-2xl">12</p>
                            </div>
                            <FaProjectDiagram className="text-4xl text-purple-500" />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
