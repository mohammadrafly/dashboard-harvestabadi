import React, { useEffect, useState } from 'react';
import { saveWhatsAppNumber, getWhatsAppNumber, getFeaturedImage, saveFeaturedImage } from '../services/settingService';
import { STORAGE_URL } from '../config/config';

const Settings = ({ isDarkMode, toggleDarkMode }) => {
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const token = localStorage.getItem('token');
    const placeholderImage = 'https://via.placeholder.com/150';

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const [whatsAppResponse, featuredImageResponse] = await Promise.all([
                    getWhatsAppNumber(token),
                    getFeaturedImage(token),
                ]);

                const number = whatsAppResponse.data.whatsAppNumber;
                setWhatsAppNumber(number.startsWith('62') ? number : number.replace('+62', ''));
                setFeaturedImage(featuredImageResponse.data.featuredImage);
            } catch (error) {
                console.error('Failed to fetch settings', error);
                setMessage({ text: 'Could not retrieve settings. Try again later.', type: 'error' });
            }
        };

        fetchSettings();
    }, [token]);

    const handleWhatsAppUpdate = async (e) => {
        e.preventDefault();
        try {
            const formattedNumber = whatsAppNumber.startsWith('62') ? whatsAppNumber : `62${whatsAppNumber}`;
            await saveWhatsAppNumber(token, { whatsAppNumber: formattedNumber });
            setMessage({ text: 'WhatsApp number updated!', type: 'success' });
        } catch (error) {
            console.error('Failed to update WhatsApp number', error);
            setMessage({ text: 'Could not update WhatsApp number. Please try again.', type: 'error' });
        }
    };

    const handleFeaturedImageUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('featuredImage', e.target.files[0]);

        try {
            const response = await saveFeaturedImage(token, formData);
            setFeaturedImage(response.data.featuredImage);
            setMessage({ text: 'Featured image updated!', type: 'success' });
        } catch (error) {
            console.error('Failed to update featured image', error);
            setMessage({ text: 'Could not update featured image. Please try again.', type: 'error' });
        }
    };

    return (
        <div className={`min-h-screen p-4 md:p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>

            <div className={`shadow-md rounded-lg p-4 mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-2">Preferences</h2>

                <div className="flex items-center mb-4">
                    <span className="mr-2">Dark Mode</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                            className="sr-only"
                        />
                        <div className={`w-12 h-6 rounded-full flex items-center p-1 transition duration-300 ease-in-out ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isDarkMode ? 'translate-x-6' : ''}`}></div>
                        </div>
                    </label>
                </div>

                <h2 className="text-xl font-semibold mb-2">WhatsApp</h2>

                {message.text && (
                    <p className={`mt-2 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        {message.text}
                    </p>
                )}

                <form onSubmit={handleWhatsAppUpdate}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium" htmlFor="whatsApp">Number</label>
                        <input
                            type="tel"
                            id="whatsApp"
                            value={whatsAppNumber}
                            onChange={(e) => setWhatsAppNumber(e.target.value.replace(/^0+/, ''))}
                            placeholder="628XXXXXXXXX"
                            className={`mt-1 block w-full border border-gray-300 ${isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-400'} rounded-md p-2`}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md py-2"
                    >
                        Update Number
                    </button>
                </form>

                <h2 className="text-xl font-semibold mt-6 mb-2">Featured Image</h2>

                <div className="mb-4">
                    <img
                        src={`${STORAGE_URL}${featuredImage}`|| placeholderImage}
                        alt="Featured"
                        className="w-1/2 h-1/2 object-cover rounded-md mb-4"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFeaturedImageUpdate}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;
