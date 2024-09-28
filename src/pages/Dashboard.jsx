import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { MdOutlineArticle } from "react-icons/md";
import { BiHomeAlt } from 'react-icons/bi';
import { TbCategory } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { IoIosArrowForward } from 'react-icons/io';

const Sidebar = ({ isOpen }) => {
    return (
        <div
        className={`bg-[#00C2FF] text-white fixed top-0 h-full transition-all duration-300 ${
            isOpen ? 'w-64 md:w-80' : 'w-0'
        }`}
        style={{ overflow: 'hidden' }}
        >
        <div className="p-4 text-4xl">
            <h1>
                HARVEST<span className="font-bold">ABADI</span>
            </h1> 
        </div>
        <ul className="mt-7 cursor-pointer text-lg">
            <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                <BiHomeAlt />
                <span className="ml-4">Dashboard</span>
            </li>
            <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                <MdOutlineArticle />
                <span className="ml-4">Blog</span>
            </li>
            <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                <TbCategory />
                <span className="ml-4">Category</span>
            </li>
            <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                <FaRegUser />
                <span className="ml-4">User</span>
            </li>
            <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                <CgWebsite />
                <span className="ml-4 pr-12">Landing Page</span>
                <IoIosArrowForward />
            </li>
        </ul>
        </div>
    );
    };

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

        <div
            className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64 md:ml-80' : 'ml-0'}`}
        >
            
            <header className="bg-white p-4 shadow-md flex justify-between items-center">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-3xl focus:outline-none mr-4">
                {isOpen ? <FiX /> : <FiMenu />}
                </button>
                <h1 className="text-xl font-bold">HARVESTABADI</h1>
            </div>
            </header>

            <main className="p-6">
                <h1>Halo world</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe nobis provident deserunt fugiat, nesciunt veritatis rem incidunt dicta! Reiciendis ipsa natus accusamus error fugiat saepe esse alias quas maiores eveniet.</p>
            </main>
        </div>
        </div>
    );
};

export default DashboardLayout;
