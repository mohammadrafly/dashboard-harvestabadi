import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';

const ProfileIcon = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="relative inline-block">
            <button onClick={toggleDropdown} className="text-2xl">
                <AiOutlineUser />
            </button>
            {dropdownOpen && (
                <div className="absolute right-0 top-0 mt-2 bg-white text-black rounded shadow-lg z-10">
                    <div className="px-4 py-2 cursor-pointer">Profile</div>
                    <div className="px-4 py-2 cursor-pointer text-red-600 flex items-center">
                        <MdLogout className="mr-2" />
                        Log Out
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;
