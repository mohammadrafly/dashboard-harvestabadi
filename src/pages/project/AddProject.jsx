import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addProject } from '../../services/projectService';

const AddProject = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [slug, setSlug] = useState('');
    const [link, setLink] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\\-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        setSlug(generateSlug(newName));
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

        const formData = new FormData();
        formData.append('slug', slug);
        formData.append('link', link);
        formData.append('content', content);

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await addProject(formData, token);
            if (response.status === 'success') {
                setSuccessMessage('Project added successfully!');
                setName('');
                setImage(null);
                setSlug('');
                setLink('');
                setContent('');
                setImagePreview('');
                setTimeout(() => {
                    navigate('/dashboard/projects');
                }, 2000);
            } else {
                throw new Error('Failed to add project');
            }
        } catch (error) {
            console.error('Failed to add project:', error);
            setError('Failed to add project. Please try again later.');
        }
    };

    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    return (
        <div className={`min-h-screen p-4 md:p-8 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h1 className="text-3xl font-semibold mb-6">Add New Project</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                <div>
                    <label className="block text-sm font-semibold mb-2">Project Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        required
                        placeholder="Enter project name" // Add your placeholder text here
                        className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Project Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        required
                        className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm">Image Preview:</p>
                            <img src={imagePreview} alt="preview" className="mt-2 w-40 h-40 object-cover rounded-md shadow-sm" />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Slug</label>
                    <input
                        type="text"
                        value={slug}
                        readOnly
                        className={`w-full p-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Link</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        placeholder="Enter project link" // Add your placeholder text here
                        className={`w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Content</label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        className={`h-fit ${isDarkMode ? 'bg-white text-black' : 'bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-5 w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Add Project
                </button>
            </form>
        </div>
    );
};

export default AddProject;
