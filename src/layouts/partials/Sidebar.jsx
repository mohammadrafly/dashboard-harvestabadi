import React from 'react';
import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { MdOutlineArticle, MdOutlineDesignServices } from 'react-icons/md';
import { FaProjectDiagram } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import ProfileIcon from '../../components/ProfileIcon';

const Sidebar = ({ isOpen }) => {
    return (
        <div
            className={`bg-[#00C2FF] text-white fixed top-0 h-full transition-all duration-300 ${isOpen ? 'w-64 md:w-80' : 'w-0'}`}
            style={{ overflow: 'hidden' }}
        >
            <div className="p-4 lg:text-4xl text-3xl text-center">
                <Link to="/home">
                    <h1>
                        HARVEST<span className="font-bold">ABADI</span>
                    </h1>
                </Link>
            </div>
            <ul className="mt-7 cursor-pointer text-lg">
                <Link to="/dashboard/home">
                    <li className="flex items-center py-2 px-4 hover:text-yellow-400">
                        <BiHomeAlt className="mr-4" />
                        Dashboard
                    </li>
                </Link>
                <Link to="/dashboard/blog">
                    <li className="flex items-center py-2 px-4 hover:text-yellow-400">
                        <MdOutlineArticle className="mr-4" />
                        Blog
                    </li>
                </Link>
                <Link to="/dashboard/projects">
                    <li className="flex items-center py-2 px-4 hover:text-yellow-400">
                        <FaProjectDiagram className="mr-4" />
                        Projects
                    </li>
                </Link>
                <Link to="/dashboard/designs">
                    <li className="flex items-center py-2 px-4 hover:text-yellow-400">
                        <MdOutlineDesignServices className="mr-4" />
                        Design Inspiration
                    </li>
                </Link>
                <Link to="/dashboard/settings">
                    <li className="flex items-center py-2 px-4 hover:text-yellow-400">
                        <FiSettings className="mr-4" />
                        Settings
                    </li>
                </Link>
            </ul>

            <div className="absolute bottom-0 left-0 p-5 w-full">
                <ProfileIcon />
            </div>
        </div>
    );
};

export default Sidebar;
