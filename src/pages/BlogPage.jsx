import React, { useEffect, useState, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import Table from '../components/Table';
import { fetchArticles, deleteArticle } from '../services/postService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const BlogPage = ({ isDarkMode }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const getArticles = useCallback(async () => {
        try {
            const response = await fetchArticles(token);
            if (response.status === 'success' && Array.isArray(response.data)) {
                setArticles(response.data);
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            console.error('Failed to fetch articles:', error);
            setError('Failed to fetch articles. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        getArticles();
    }, [getArticles]);

    const handleEdit = (article) => {
        navigate(`/dashboard/blog/edit/${article.id}`, { state: { article } });
    };

    const handleDelete = async (articleId) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await deleteArticle(articleId, token);
                setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));
                setSuccessMessage('Article deleted successfully!');
            } catch (error) {
                console.error('Failed to delete article:', error);
                setError('Failed to delete article. Please try again later.');
            }
        }
    };

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Title', accessor: 'title' },
        {
            Header: 'Author',
            accessor: (row) => (row.author ? row.author.name : 'Unknown'),
        },
        {
            Header: 'Date',
            accessor: (row) => moment(row.created_at).format('DD, MMM YYYY'),
        },
    ];

    return (
        <main className={`p-4 md:p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Articles</h1>

            <button
                onClick={() => navigate('/dashboard/blog/add')}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 flex items-center ${isDarkMode ? 'bg-blue-700' : 'bg-blue-500'}`}
            >
                <FiPlus className="mr-2" />
                Add Article
            </button>

            {loading ? (
                <p>Loading articles...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    {successMessage && (
                        <p className="text-green-500 mb-4">{successMessage}</p>
                    )}
                    <Table
                        data={articles}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </main>
    );
};

export default BlogPage;
