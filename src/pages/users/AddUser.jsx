// components/AddUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/usersService';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const userData = {
            name,
            email,
            password,
        };

        try {
            const response = await createUser(userData, token);
            if (response.status === 'success') {
                setSuccessMessage('User added successfully!');
                setTimeout(() => {
                    navigate('/users');
                }, 2000);
            } else {
                throw new Error('Failed to add user');
            }
        } catch (error) {
            setError('Failed to add user. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <h1 className="text-3xl font-semibold mb-6">Add New User</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-5 w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-md"
                >
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUser;
