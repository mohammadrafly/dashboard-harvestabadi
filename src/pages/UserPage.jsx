import React, { useEffect, useState, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import Table from '../components/Table';
import { fetchUsers, deleteUser } from '../services/usersService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const UserPage = ({ isDarkMode }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const getUsers = useCallback(async () => {
        try {
            const response = await fetchUsers(token);
            if (response.status === 'success' && Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setError('Failed to fetch users. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleEdit = (user) => {
        navigate(`/dashboard/users/edit/${user.id}`, { state: { user } });
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(userId, token);
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
                setSuccessMessage('User deleted successfully!');
            } catch (error) {
                console.error('Failed to delete user:', error);
                setError('Failed to delete user. Please try again later.');
            }
        }
    };

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        {
            Header: 'Created At',
            accessor: (row) => moment(row.created_at).format('DD, MMM YYYY'),
        },
    ];

    return (
        <main className={`p-4 md:p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Users</h1>

            <button
                onClick={() => navigate('/dashboard/users/add')}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 flex items-center ${isDarkMode ? 'bg-blue-700' : 'bg-blue-500'}`}
            >
                <FiPlus className="mr-2" />
                Add User
            </button>

            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    {successMessage && (
                        <p className="text-green-500 mb-4">{successMessage}</p>
                    )}
                    <Table
                        data={users}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </main>
    );
};

export default UserPage;
