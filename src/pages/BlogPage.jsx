import React, { useState, useEffect } from 'react';
import Slidebar from '../layouts/Slidebar';
import { FiMenu, FiX, FiPlus } from 'react-icons/fi'; // Import FiPlus icon
import Table from '../components/Table';

const BlogPage = () => {
    const [isOpen, setIsOpen] = useState(false);

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

    const toggleSlidebar = () => {
        setIsOpen(!isOpen);
    };

    const articles = [
        { id: 1, title: 'gadis tomboi yang semangatnya meletup-letup', author: 'Zee', date: 'Sept 28, 2024' },
        { id: 2, title: 'terangi harimu dengan senyum karamelku', author: 'Freya', date: 'Sept 27, 2024' },
    ];

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Author', accessor: 'author' },
        { Header: 'Date', accessor: 'date' },
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
                        <h1 className="text-xl font-bold">Blog</h1>
                    </div>
                </header>

                <main className="p-4 md:p-6">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">Articles</h1>

                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 flex items-center">
                        <FiPlus className="mr-2" />
                        Add Article
                    </button>
                    <div className="overflow-x-auto">
                        <Table data={articles} columns={columns} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BlogPage;
