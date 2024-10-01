import React from 'react';
//import { FaUsers, FaProjectDiagram } from 'react-icons/fa';
//import { MdOutlineArticle } from 'react-icons/md';
import DashboardLayout from '../layouts/DashboardLayout';

const Home = () => {
    return (
        <DashboardLayout title={'Home'}>
            <main className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    Welcome back!
                </div>
            </main>
        </DashboardLayout>

    );
};

export default Home;
