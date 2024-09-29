import React, { useState, useEffect } from 'react';
import Slidebar from '../layouts/Slidebar';
import { FiMenu, FiX } from 'react-icons/fi';

const BlogPage = () => {
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

    const toggleSlidebar = () => {
        setIsOpen(!isOpen);
    };

    const articles = [
        {
        id: 1,
        title: 'Loremmmmmmmmmmmmmmm',
        content: 'Lorem Ipsum sit emetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        author: 'Zee',
        date: 'Sept 28, 2024',
        },
        {
        id: 2,
        title: 'HAIIIIIIIIIIIIIIII',
        content: 'Gadis korelis yang suka berimajinasi dengan senyum karamelku',
        author: 'Freya',
        date: 'Sept 27, 2024',
        },
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

            <main className="p-6">
                <h1 className="text-3xl font-bold mb-6">Articles</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((article) => (
                    <div key={article.id} className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                        <p className="text-gray-600 text-sm mb-4">
                        {article.date} | By {article.author}
                        </p>
                        <p className="text-gray-800">{article.content}</p>
                    </div>
                    ))}
                </div>
            </main>
        </div>
        </div>
    );
};

export default BlogPage;
