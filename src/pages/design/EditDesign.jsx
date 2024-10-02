import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDesignById, updateDesign } from '../../services/designService';

const EditDesign = () => {
    const { id } = useParams();
    const [link, setLink] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const getDesign = async () => {
            try {
                const response = await fetchDesignById(id, token);
                const design = response.data;
                setLink(design.link);
            } catch (error) {
                console.error('Error fetching design:', error);
                setError('Failed to load design details.');
            }
        };
        getDesign();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('link', link);

        try {
            const response = await updateDesign(id, formData, token);
            if (response.status === 'success') {
                setSuccessMessage('Design updated successfully!');
                setTimeout(() => {
                    navigate('/dashboard/designs');
                }, 2000);
            } else {
                throw new Error('Failed to update design');
            }
        } catch (error) {
            console.error('Failed to update design:', error);
            setError('Failed to update design. Please try again later.');
        }
    };

    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    return (
        <div className={`min-h-screen p-4 md:p-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h1 className="text-3xl font-semibold mb-6">Edit Design</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <div>
                    <label className="block text-sm font-semibold mb-2">Link</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        placeholder="Enter the design link" // Add your placeholder text here
                        className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-5 w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Update Design
                </button>
            </form>
        </div>
    );
};

export default EditDesign;
