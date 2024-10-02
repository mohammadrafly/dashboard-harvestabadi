import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { verifyToken, updateUserProfile, updateUserPassword } from '../services/authService';

const Profile = ({ isDarkMode }) => {
    const { email } = useParams();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getUserData = async () => {
            const token = localStorage.getItem('token');

            if (email) {
                try {
                    const data = await verifyToken(token);
                    setUserData(data.data);
                    setName(data.data.name);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch user data', error);
                    setError('Failed to fetch user data. Please try again later.');
                    setLoading(false);
                }
            } else {
                setError('Email parameter is missing.');
                setLoading(false);
            }
        };
        getUserData();
    }, [email]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        try {
            await updateUserProfile(token, { name, email: userData.email }, userData.email);
            setMessage({ text: 'Profile updated successfully!', type: 'success' });
        } catch (error) {
            console.error('Failed to update profile', error);
            setMessage({ text: 'Failed to update profile. Please try again.', type: 'error' });
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage({ text: 'New passwords do not match!', type: 'error' });
            return;
        }

        try {
            const response = await updateUserPassword(token, { currentPassword, newPassword }, email);
            if (response.status === 'success') {
                setMessage({ text: 'Password updated successfully!', type: 'success' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                const validationErrors = response.data.new_password;
                if (validationErrors && validationErrors.length > 0) {
                    setMessage({ text: validationErrors[0], type: 'error' });
                } else {
                    setMessage({ text: response.data.message, type: 'error' });
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage({ text: error.response.message, type: 'error' });
            } else {
                setMessage({ text: 'Failed to update password.', type: 'error' });
            }
        }
    };

    return (
        <div className={`container mx-auto p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className={`shadow-md rounded-lg p-4 mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                        <h2 className="text-xl font-semibold mb-2">User Information</h2>
                        <form onSubmit={handleProfileUpdate}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-400'}`}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={userData.email}
                                    readOnly
                                    className={`mt-1 block w-full border border-gray-400 rounded-md p-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-black'}`}
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2">Update Profile</button>
                        </form>
                    </div>

                    <div className={`shadow-md rounded-lg p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                        <h2 className="text-xl font-semibold mb-2">Change Password</h2>
                        {message.text && (
                            <p className={`mt-2 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                {message.text}
                            </p>
                        )}
                        <form onSubmit={handlePasswordUpdate}>
                            <div>
                                <label className="block mb-1">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className={`border rounded w-full px-3 py-2 ${isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-400'}`}
                                    placeholder="Enter current password"
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={`border rounded w-full px-3 py-2 ${isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-400'}`}
                                    placeholder="Enter new password"
                                    required
                                />
                            </div>
                            <div className="mt-4 mb-4">
                                <label className="block mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`border rounded w-full px-3 py-2 ${isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-400'}`}
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2">Change Password</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
