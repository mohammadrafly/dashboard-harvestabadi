import React from 'react';

const Card = ({ title, count, icon }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-3xl font-semibold">{count}</p>
            </div>
            <div className="text-5xl text-blue-500">
                {icon}
            </div>
        </div>
    );
};

export default Card;
