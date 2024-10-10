// components/EditUser.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById, updateUser } from '../../services/usersService';

const EditUser = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetchUserById(id, token);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                setError('Failed to fetch user');
            }
        };

        fetchUser();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const userData = { name, email };

        try {
            const response = await updateUser(id, userData, token);
            if (response.status === 'success') {
                setSuccessMessage('User updated successfully!');
                setTimeout(() => {
                    navigate('/users');
                }, 2000);
            } else {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            setError('Failed to update user. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <h1 className="text-3xl font-semibold mb-6">Edit User</h1>

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
                <button
                    type="submit"
                    className="mt-5 w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-md"
                >
                    Update User
                </button>
            </form>
        </div>
    );
};

export default EditUser;
