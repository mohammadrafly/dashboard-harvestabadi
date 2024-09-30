import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';

const ProfileIcon = ({ email }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <div className="relative inline-block w-full text-center bg-white px-4 py-3 rounded-lg font-semibold" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="flex items-center w-full text-2xl text-black hover:text-[#00C2FF]">
                <AiOutlineUser className="mr-3"/>
                <span className="block text-lg">{email}</span>
            </button>

            {dropdownOpen && (
                <div className="absolute left-0 bottom-full mb-1 w-full bg-white text-black rounded shadow-lg z-10">
                    <div className="px-4 py-2 cursor-pointer flex items-center hover:bg-slate-200">
                        <AiOutlineUser className="mr-2" />
                        <p>Profile</p>
                    </div>
                    <div className="px-4 py-2 cursor-pointer text-red-600 flex items-center hover:bg-slate-200">
                        <MdLogout className="mr-2" />
                        <p>Log Out</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;
