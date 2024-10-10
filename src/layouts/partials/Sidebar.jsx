import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { MdOutlineArticle, MdOutlineDesignServices } from 'react-icons/md';
import { FaProjectDiagram } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import ProfileIcon from '../../components/ProfileIcon';

const Sidebar = ({ isOpen }) => {
    const location = useLocation();
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    const links = [
        { path: '/dashboard/home', label: 'Dashboard', icon: <BiHomeAlt size={24} /> },
        { path: '/dashboard/blog', label: 'Blog', icon: <MdOutlineArticle size={24} /> },
        { path: '/dashboard/projects', label: 'Projects', icon: <FaProjectDiagram size={24} /> },
        { path: '/dashboard/designs', label: 'Design Inspiration', icon: <MdOutlineDesignServices size={24} /> },
        { path: '/dashboard/services', label: 'Services', icon: <MdOutlineDesignServices size={24} /> }, // Services link
        { path: '/dashboard/users', label: 'Users', icon: <MdOutlineDesignServices size={24} /> }, // Added Users link
        { path: '/dashboard/settings', label: 'Settings', icon: <FiSettings size={24} /> },
    ];

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <div
            className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#00C2FF] text-white'} fixed top-0 h-full transition-all duration-300 ${isOpen ? 'w-64 md:w-80' : 'w-0'}`}
            style={{ overflow: 'hidden' }}
        >
            <div className="p-4 lg:text-4xl text-3xl text-center">
                <Link to="/home">
                    <h1>
                        HARVEST<span className="font-bold">ABADI</span>
                    </h1>
                </Link>
            </div>

            <ul className="mt-7 cursor-pointer text-lg px-4">
                {links.map(({ path, label, icon }) => (
                    <Link to={path} key={path}>
                        <li
                            className={`flex items-center py-2 my-2 px-4 rounded-lg transition-colors duration-300
                            ${isActive(path) ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'}
                            ${isActive(path) ? 'shadow-lg' : ''}`}
                        >
                            <span className="mr-4">{icon}</span>
                            {label}
                        </li>
                    </Link>
                ))}
            </ul>

            <div className="absolute bottom-0 left-0 p-5 w-full">
                <ProfileIcon />
            </div>
        </div>
    );
};

export default Sidebar;
