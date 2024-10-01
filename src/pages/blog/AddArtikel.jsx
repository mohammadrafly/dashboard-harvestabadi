import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addArticle } from '../../services/postService';
import DashboardLayout from '../../layouts/DashboardLayout';
import { verifyToken } from '../../services/authService';

const AddArticle = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\\-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const response = await verifyToken(token);
        const author = response.data.id;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('content', content);
        formData.append('author', author);
        formData.append('category', 1);

        if (image) {
            formData.append('image', image);
        }
        console.log(formData)
        try {
            const response = await addArticle(formData, token);
            if (response.status === 'success') {
                setSuccessMessage('Article added successfully!');
                setTitle('');
                setImage(null);
                setSlug('');
                setContent('');
                setImagePreview('');
                setTimeout(() => {
                    navigate('/dashboard/blog');
                }, 2000);
            } else {
                throw new Error('Failed to add article');
            }
        } catch (error) {
            console.error('Failed to add article:', error);
            setError('Failed to add article. Please try again later.');
        }
    };

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add New Article</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">Image Preview:</p>
                                <img src={imagePreview} alt="preview" className="mt-2 w-40 h-40 object-cover rounded-md shadow-sm" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
                        <input
                            type="text"
                            value={slug}
                            readOnly
                            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                            className="h-fit bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-5 w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        Add Article
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default AddArticle;
