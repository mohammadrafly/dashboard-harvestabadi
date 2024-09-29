import React from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { MdOutlineArticle } from 'react-icons/md';
import { TbCategory } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../components/ProfileIcon'; // Import the ProfileIcon

const Sidebar = ({ isOpen }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`bg-[#00C2FF] text-white fixed top-0 h-full transition-all duration-300 ${isOpen ? 'w-64 md:w-80' : 'w-0'}`}
            style={{ overflow: 'hidden' }}
        >
            <div className="p-4 lg:text-4xl text-3xl">
                <h1>
                    HARVEST<span className="font-bold">ABADI</span>
                </h1> 
            </div>
            <ul className="mt-7 cursor-pointer text-lg">
                <li className="py-2 px-4 hover:text-yellow-400 flex items-center" onClick={() => navigate('/dashboard')}>
                    <BiHomeAlt />
                    <span className="ml-4">Dashboard</span>
                </li>
                <li className="py-2 px-4 hover:text-yellow-400 flex items-center" onClick={() => navigate('/blog')}>
                    <MdOutlineArticle />
                    <span className="ml-4">Blog</span>
                </li>
                <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                    <TbCategory />
                    <span className="ml-4">Category</span>
                </li>
                <li className="py-2 px-4 hover:text-yellow-400 flex items-center" onClick={() => navigate('/users')}>
                    <FaRegUser />
                    <span className="ml-4">User</span>
                </li>
                <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                    <CgWebsite />
                    <span className="ml-4 pr-12">Landing Page</span>
                    <IoIosArrowForward />
                </li>
            </ul>

            <div className="absolute bottom-4 left-4">
                <ProfileIcon />
            </div>
        </div>
    );
};

export default Sidebar;
