import React from 'react';
import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import { MdOutlineArticle } from 'react-icons/md';
import { TbCategory } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { IoIosArrowForward } from 'react-icons/io';
import ProfileIcon from '../components/ProfileIcon';

const Slidebar = ({ isOpen }) => {
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
                <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                    <BiHomeAlt />
                    <Link to="/dashboard" className="ml-4">Dashboard</Link>
                </li>
                <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                    <MdOutlineArticle />
                    <Link to="/blog" className="ml-4">Blog</Link>
                </li>
                <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                    <TbCategory />
                    <Link className="ml-4">Category</Link>
                </li>
                <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                    <FaRegUser />
                    <Link to="/users" className="ml-4">User</Link>
                </li>
                <li className="py-2 px-4 hover:text-yellow-400 flex items-center">
                    <CgWebsite />
                    <Link className="ml-4 pr-12">Landing Page</Link>
                    <IoIosArrowForward />
                </li>
            </ul>

            <div className="absolute bottom-4 left-4">
                <ProfileIcon />
            </div>
        </div>
    );
};

export default Slidebar;
