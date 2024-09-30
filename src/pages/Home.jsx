import React from 'react';
import { FaUsers, FaProjectDiagram } from 'react-icons/fa';
import { MdOutlineArticle } from 'react-icons/md';
import DashboardLayout from '../layouts/DashboardLayout';

const Home = () => {

    return (
        <DashboardLayout title={'Home'}>
            <main className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Total Users', count: 150, icon: <FaUsers className="text-4xl text-blue-500" /> },
                        { title: 'Total Articles', count: 30, icon: <MdOutlineArticle className="text-4xl text-green-500" /> },
                        { title: 'Total Projects', count: 12, icon: <FaProjectDiagram className="text-4xl text-purple-500" /> }
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">{item.title}</h2>
                                <p className="text-2xl">{item.count}</p>
                            </div>
                            {item.icon}
                        </div>
                    ))}
                </div>
            </main>
        </DashboardLayout>

    );
};

export default Home;
