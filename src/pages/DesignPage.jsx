import React, { useEffect, useState, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import Table from '../components/Table';
import DashboardLayout from '../layouts/DashboardLayout';
import { fetchDesigns, deleteDesign } from '../services/designService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const DesignsPage = () => {
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const getDesigns = useCallback(async () => {
        try {
            const response = await fetchDesigns(token);
            if (response.status === 'success' && Array.isArray(response.data)) {
                setDesigns(response.data);
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            console.error('Failed to fetch designs:', error);
            setError('Failed to fetch designs. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        getDesigns();
    }, [getDesigns]);

    const handleEdit = (design) => {
        navigate(`/dashboard/designs/edit/${design.id}`, { state: { design } });
    };

    const handleDelete = async (designId) => {
        if (window.confirm('Are you sure you want to delete this design?')) {
            try {
                await deleteDesign(designId, token);
                setDesigns((prevDesigns) => prevDesigns.filter((design) => design.id !== designId));
                setSuccessMessage('Design deleted successfully!');
            } catch (error) {
                console.error('Failed to delete design:', error);
                setError('Failed to delete design. Please try again later.');
            }
        }
    };

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Link', accessor: 'link' },
        {
            Header: 'Created At',
            accessor: (row) => moment(row.created_at).format('DD, MMM YYYY'),
        },
    ];

    return (
        <DashboardLayout title={'Designs'}>
            <main className="p-4 md:p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Designs</h1>

                <button
                    onClick={() => navigate('/dashboard/designs/add')}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 flex items-center"
                >
                    <FiPlus className="mr-2" />
                    Add Design
                </button>

                {loading ? (
                    <p>Loading designs...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        {successMessage && (
                            <p className="text-green-500 mb-4">{successMessage}</p>
                        )}
                        <Table
                            data={designs}
                            columns={columns}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                )}
            </main>
        </DashboardLayout>
    );
};

export default DesignsPage;
