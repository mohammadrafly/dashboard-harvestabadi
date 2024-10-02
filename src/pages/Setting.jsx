import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { saveWhatsAppNumber, getWhatsAppNumber } from '../services/settingService';

const Settings = () => {
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchWhatsAppNumber = async () => {
            try {
                const response = await getWhatsAppNumber(token);
                setWhatsAppNumber(response.data.whatsAppNumber);
            } catch (error) {
                console.error('Failed to fetch WhatsApp number', error);
                setMessage({ text: 'Failed to fetch WhatsApp number. Please try again later.', type: 'error' });
            }
        };

        fetchWhatsAppNumber();
    }, [token]);

    const handleWhatsAppUpdate = async (e) => {
        e.preventDefault();
        try {
            await saveWhatsAppNumber(token, { whatsAppNumber });
            setMessage({ text: 'WhatsApp number updated successfully!', type: 'success' });
        } catch (error) {
            console.error('Failed to update WhatsApp number', error);
            setMessage({ text: 'Failed to update WhatsApp number. Please try again.', type: 'error' });
        }
    };

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
    };

    return (
        <DashboardLayout title="Settings">
            <div className={`container mx-auto p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                <h1 className="text-2xl font-bold mb-4">Settings</h1>

                <div className="flex items-center mb-4">
                    <span className="mr-2">Dark Mode</span>
                    <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                        className="toggle-checkbox"
                    />
                </div>

                <div className={`shadow-md rounded-lg p-4 mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                    <h2 className="text-xl font-semibold mb-2">WhatsApp Number</h2>

                    {message.text && (
                        <p className={`mt-2 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                            {message.text}
                        </p>
                    )}

                    <form onSubmit={handleWhatsAppUpdate}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium" htmlFor="whatsApp">WhatsApp Number</label>
                            <input
                                type="number"
                                id="whatsApp"
                                value={whatsAppNumber}
                                onChange={(e) => setWhatsAppNumber(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded-md py-2"
                        >
                            Update WhatsApp Number
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
