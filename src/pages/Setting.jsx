import React, { useEffect, useState } from 'react';
import { saveWhatsAppNumber, getWhatsAppNumber } from '../services/settingService';

const Settings = ({ isDarkMode, toggleDarkMode }) => {
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchWhatsAppNumber = async () => {
            try {
                const response = await getWhatsAppNumber(token);
                const number = response.data.whatsAppNumber;
                setWhatsAppNumber(number.startsWith('62') ? number : number.replace('+62', ''));
            } catch (error) {
                console.error('Failed to fetch WhatsApp number', error);
                setMessage({ text: 'Could not retrieve WhatsApp number. Try again later.', type: 'error' });
            }
        };

        fetchWhatsAppNumber();
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

                {/* WhatsApp Number Input */}
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
            </div>
        </div>
    );
};

export default Settings;
