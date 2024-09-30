import React from 'react';
import { FiPlus} from 'react-icons/fi';
import Table from '../components/Table';
import DashboardLayout from '../layouts/DashboardLayout';

const UserPage = () => {

    const users = [
        { id: 1, username: 'Freya', email: 'freya@example.com', role: 'Admin', dateJoined: 'Sept 28, 2024' },
        { id: 2, username: 'Shani', email: 'shani@example.com', role: 'Editor', dateJoined: 'Sept 27, 2024' },
        { id: 3, username: 'Zee', email: 'zee@example.com', role: 'Editor', dateJoined: 'Sept 26, 2024' },
        { id: 4, username: 'Adel', email: 'adel@example.com', role: 'Editor', dateJoined: 'Sept 29, 2024' },
        { id: 5, username: 'Jessica', email: 'jessica@example.com', role: 'Editor', dateJoined: 'Sept 30, 2024' },
    ];

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Username', accessor: 'username' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Date Joined', accessor: 'dateJoined' },
    ];

    return (
        <DashboardLayout title={'User'}>
                <main className="p-4 md:p-6">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">User List</h1>

                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 flex items-center">
                        <FiPlus className="mr-2" />
                        Add User
                    </button>

                    <div className="overflow-x-auto">
                        <Table data={users} columns={columns} />
                    </div>
                </main>
        </DashboardLayout>
    );
};

export default UserPage;
