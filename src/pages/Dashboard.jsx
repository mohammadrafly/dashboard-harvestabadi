import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaUsers, FaProjectDiagram } from 'react-icons/fa';
import { MdOutlineArticle } from 'react-icons/md';
import Sidebar from '../layouts/Slidebar';
import Card from '../components/Card';
import Table from '../components/Table';

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

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Role', accessor: 'role' },
    ];

    const data = [
        { id: 1, name: 'Lorem', email: 'lorem@example.com', role: 'Admin' },
        { id: 2, name: 'Ipsoem Smith', email: 'ipsoem@example.com', role: 'Editor' },
        { id: 3, name: 'Freya', email: 'freya@example.com', role: 'User' },
    ];

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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Card 
                            title="Users" 
                            count={150} 
                            icon={<FaUsers />} 
                        />
                        <Card 
                            title="Articles" 
                            count={30} 
                            icon={<MdOutlineArticle />} 
                        />
                        <Card 
                            title="Projects" 
                            count={12} 
                            icon={<FaProjectDiagram />} 
                        />
                    </div>

                    {/* Tabel sama fitur Search, Sort, dan Pagination */}
                    <Table data={data} columns={columns} />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
