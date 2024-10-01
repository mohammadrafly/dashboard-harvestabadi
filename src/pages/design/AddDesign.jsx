import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDesign } from '../../services/designService';
import DashboardLayout from '../../layouts/DashboardLayout';

const AddDesign = () => {
    const [link, setLink] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createDesign({ link }, token);
            setSuccessMessage('Design added successfully!');
            if (response.status === 'success') {
              setLink('');
            setTimeout(() => navigate('/dashboard/designs'), 2000);
          } else {
              throw new Error('Failed to add project');
          }
        } catch (error) {
            console.error('Failed to add design:', error);
            setError('Failed to add design. Please try again later.');
        }
    };

    return (
      <DashboardLayout>
        <div className="p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Add Design</h1>
            <form onSubmit={handleSubmit} className="max-w-md">
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                <div className="mb-4">
                    <label htmlFor="link" className="block mb-2">Link</label>
                    <input
                        type="text"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Add Design
                </button>
            </form>
        </div>
      </DashboardLayout>
    );
};

export default AddDesign;
