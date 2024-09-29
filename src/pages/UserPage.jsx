import React, { useState, useEffect } from 'react';
import Slidebar from '../layouts/Slidebar';
import { FiMenu, FiPlus, FiX } from 'react-icons/fi';
import Table from '../components/Table';

const UserPage = () => {
    const [isOpen, setIsOpen] = useState(() => {
        const storedState = localStorage.getItem('sidebarOpenUser');
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
        localStorage.setItem('sidebarOpenUser', JSON.stringify(isOpen));
    }, [isOpen]);

    const toggleSlidebar = () => {
        setIsOpen(!isOpen);
    };

    // Sample user data
    const users = [
        { id: 1, username: 'Freya', email: 'freya@example.com', role: 'Admin', dateJoined: 'Sept 28, 2024' },
        { id: 2, username: 'Shani', email: 'shani@example.com', role: 'Editor', dateJoined: 'Sept 27, 2024' },
        { id: 3, username: 'Zee', email: 'zee@example.com', role: 'Editor', dateJoined: 'Sept 26, 2024' },
        { id: 4, username: 'Adel', email: 'adel@example.com', role: 'Editor', dateJoined: 'Sept 29, 2024' },
        { id: 5, username: 'Jessica', email: 'jessica@example.com', role: 'Editor', dateJoined: 'Sept 30, 2024' },
    ];

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Username', accessor: 'username' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Date Joined', accessor: 'dateJoined' },
    ];

    return (
        <div className="flex h-screen">
            <Slidebar isOpen={isOpen} />

            <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64 md:ml-80' : 'ml-0'}`}>
                <header className="bg-white p-4 shadow-md flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={toggleSlidebar} className="text-3xl focus:outline-none mr-4">
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                        <h1 className="text-xl font-bold">Users</h1>
                    </div>
                </header>

                <main className="p-4 md:p-6">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">User List</h1>

                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 flex items-center">
                        <FiPlus className="mr-2" />
                        Add User
                    </button>

                    <div className="overflow-x-auto">
                        <Table data={users} columns={columns} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserPage;
