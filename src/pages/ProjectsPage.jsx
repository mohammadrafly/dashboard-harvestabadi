import React, { useEffect, useState, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import Table from '../components/Table';
import { fetchProjects, deleteProject } from '../services/projectService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ProjectsPage = ({ isDarkMode }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const getProjects = useCallback(async () => {
        try {
            const response = await fetchProjects(token);
            if (response.status === 'success' && Array.isArray(response.data)) {
                setProjects(response.data);
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            setError('Failed to fetch projects. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    const handleEdit = (project) => {
        navigate(`/dashboard/projects/edit/${project.id}`, { state: { project } });
    };

    const handleDelete = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(projectId, token);
                setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
                setSuccessMessage('Project deleted successfully!');
            } catch (error) {
                console.error('Failed to delete project:', error);
                setError('Failed to delete project. Please try again later.');
            }
        }
    };

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Slug', accessor: 'slug' },
        {
            Header: 'Image',
            accessor: 'image',
            Cell: ({ value }) => {
                const imageUrl = `http://localhost:8000/storage/images/${value}`;
                return <img src={imageUrl} alt="project" className="w-16 h-16 object-cover" />;
            },
        },
        { Header: 'Link', accessor: 'link' },
        {
            Header: 'Content',
            accessor: 'content',
            Cell: ({ value }) => <p>{value.length > 100 ? `${value.slice(0, 100)}...` : value}</p>
        },
        {
            Header: 'Created At',
            accessor: (row) => moment(row.created_at).format('DD, MMM YYYY'),
        },
    ];

    return (
        <div className={`min-h-screen p-4 md:p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Projects</h1>

            <button
                onClick={() => navigate('/dashboard/projects/add')}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 flex items-center"
            >
                <FiPlus className="mr-2" />
                Add Project
            </button>

            {loading ? (
                <p>Loading projects...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    {successMessage && (
                        <p className="text-green-500 mb-4">{successMessage}</p>
                    )}
                    <Table
                        data={projects}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;
