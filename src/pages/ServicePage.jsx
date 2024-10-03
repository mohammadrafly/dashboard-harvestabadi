import React, { useEffect, useState, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import Table from '../components/Table';
import { fetchServices, deleteService } from '../services/servicesService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ServicePage = ({ isDarkMode }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const getServices = useCallback(async () => {
        try {
            const response = await fetchServices(token);
            if (response.status === 'success' && Array.isArray(response.data)) {
                setServices(response.data);
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
            setError('Failed to fetch services. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        getServices();
    }, [getServices]);

    const handleEdit = (service) => {
        navigate(`/dashboard/services/edit/${service.id}`, { state: { service } });
    };

    const handleDelete = async (serviceId) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(serviceId, token);
                setServices((prevServices) => prevServices.filter((service) => service.id !== serviceId));
                setSuccessMessage('Service deleted successfully!');
            } catch (error) {
                console.error('Failed to delete service:', error);
                setError('Failed to delete service. Please try again later.');
            }
        }
    };

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Slug', accessor: 'slug' },
        { Header: 'Date Created', accessor: (row) => moment(row.created_at).format('DD, MMM YYYY') },
    ];

    return (
        <main className={`p-4 md:p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Services</h1>

            <button
                onClick={() => navigate('/dashboard/services/add')}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 flex items-center ${isDarkMode ? 'bg-blue-700' : 'bg-blue-500'}`}
            >
                <FiPlus className="mr-2" />
                Add Service
            </button>

            {loading ? (
                <p>Loading services...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    {successMessage && (
                        <p className="text-green-500 mb-4">{successMessage}</p>
                    )}
                    <Table
                        data={services}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </main>
    );
};

export default ServicePage;
