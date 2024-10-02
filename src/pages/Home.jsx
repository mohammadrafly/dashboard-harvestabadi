import React from 'react';

const Home = ({ isDarkMode }) => {
    return (
        <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <main>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <h1 className="text-2xl md:text-3xl font-bold">Welcome back!</h1>
                    {/* Additional content can be added here */}
                </div>
            </main>
        </div>
    );
};

export default Home;
