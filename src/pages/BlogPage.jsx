import React from 'react';
import { FiPlus } from 'react-icons/fi';
import Table from '../components/Table';
import DashboardLayout from '../layouts/DashboardLayout';

const BlogPage = () => {

    const articles = [
        { id: 1, title: 'gadis tomboi yang semangatnya meletup-letup', author: 'Zee', date: 'Sept 28, 2024' },
        { id: 2, title: 'gadis koleris yang suka berimajinasi, terangi harimu dengan senyum karamelku', author: 'Freya', date: 'Sept 27, 2024' },
        { id: 3, title: 'bagai kucing kalem, tapi selalu memikat hati kamu', author: 'Adel', date: 'Sept 29, 2024' },
        { id: 4, title: 'semanis coklat, selembut sutra', author: 'Shani', date: 'Sept 30, 2024' },
        { id: 5, title: 'suka menari dan akan berusaha menjadi energimu', author: 'Jessica', date: 'Sept 26, 2024' },
    ];

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Author', accessor: 'author' },
        { Header: 'Date', accessor: 'date' },
    ];

    return (
        <DashboardLayout>
            <main className="p-4 md:p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Articles</h1>

                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 flex items-center">
                    <FiPlus className="mr-2" />
                    Add Article
                </button>
                <div className="overflow-x-auto">
                    <Table data={articles} columns={columns} />
                </div>
            </main>
        </DashboardLayout>
    );
};

export default BlogPage;
