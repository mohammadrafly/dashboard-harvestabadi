import React, { useState, useMemo } from 'react';

const Table = ({ data, columns, onEdit, onDelete }) => {
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSort = (field) => {
        const order = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = useMemo(() => {
        let filtered = data.filter((row) =>
            columns.some((column) =>
                row[column.accessor].toString().toLowerCase().includes(search.toLowerCase())
            )
        );

        if (sortField) {
            filtered = filtered.sort((a, b) => {
                const aValue = a[sortField];
                const bValue = b[sortField];
                return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
            });
        }

        return filtered;
    }, [data, columns, search, sortField, sortOrder]);

    const startIdx = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIdx, startIdx + rowsPerPage);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <div className="w-full bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between mb-4 flex-col md:flex-row">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3 mb-2 md:mb-0"
                />
                <select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <div className="overflow-hidden">
                <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white text-left text-xs md:text-sm">
                            {columns.map((column) => (
                                <th
                                    key={column.accessor}
                                    onClick={() => handleSort(column.accessor)}
                                    className="border-b border-gray-300 p-2 cursor-pointer hover:bg-blue-500 transition-colors duration-200"
                                >
                                    <div className="flex items-center justify-between">
                                        {column.Header}
                                        {sortField === column.accessor && (
                                            <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
                                        )}
                                    </div>
                                </th>
                            ))}
                            <th className="border-b border-gray-300 p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs md:text-sm">
                        {paginatedData.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`hover:bg-gray-100 transition-colors duration-200 ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                {columns.map((column) => (
                                    <td key={column.accessor} className="border-b border-gray-200 p-2 text-gray-800">
                                        {row[column.accessor]}
                                    </td>
                                ))}
                                <td className="border-b border-gray-200 p-2 text-gray-800 text-center">
                                    <div className="flex flex-col sm:flex-row sm:space-x-2 lg:justify-center">
                                        <button 
                                            onClick={() => onEdit(row)} 
                                            className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-500 transition-colors duration-200 md:px-3 md:py-1.5"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete(row.id)} 
                                            className="mt-2 sm:mt-0 bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-500 transition-colors duration-200 md:px-3 md:py-1.5"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center p-4 text-gray-500">
                                    No data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div className="text-gray-600 text-xs md:text-sm">
                    Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-500 transition-colors duration-200 disabled:opacity-50 text-xs md:text-sm"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="ml-2 px-4 py-2 border border-gray-300 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-500 transition-colors duration-200 disabled:opacity-50 text-xs md:text-sm"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
