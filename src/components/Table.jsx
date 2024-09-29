import React, { useState, useMemo } from 'react';

const Table = ({ data, columns }) => {
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // sorting
    const handleSort = (field) => {
        const order = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    // pagination
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    // Filter and sort data
    const filteredData = useMemo(() => {
        let filtered = data.filter((row) =>
            columns.some(
                (column) =>
                    row[column.accessor].toString().toLowerCase().includes(search.toLowerCase())
            )
        );

        if (sortField) {
            filtered = filtered.sort((a, b) => {
                const aValue = a[sortField];
                const bValue = b[sortField];

                if (sortOrder === 'asc') {
                    return aValue > bValue ? 1 : -1;
                }
                return aValue < bValue ? 1 : -1;
            });
        }

        return filtered;
    }, [data, columns, search, sortField, sortOrder]);

    // Pagination logic
    const startIdx = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIdx, startIdx + rowsPerPage);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return (
        <div className="w-full">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="p-2 border rounded"
                />

                <select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    className="p-2 border rounded"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.accessor}
                                onClick={() => handleSort(column.accessor)}
                                className="border p-2 cursor-pointer"
                            >
                                {column.Header}
                                {sortField === column.accessor && (
                                    <span>
                                        {sortOrder === 'asc' ? ' 🔼' : ' 🔽'}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td key={column.accessor} className="border p-2">
                                    {row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <div>
                    Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded cursor-pointer"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="ml-2 px-4 py-2 border rounded cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
