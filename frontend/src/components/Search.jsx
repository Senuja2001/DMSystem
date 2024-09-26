// components/Search.jsx
import React from 'react';

const SearchFilter = ({ searchParams, handleInputChange, handleSearch }) => {
    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <input
                type="text"
                name="returnNo"
                value={searchParams.returnNo}
                onChange={handleInputChange}
                placeholder="Return No"
                className="border border-gray-400 p-2 rounded-md w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#10538A] transition duration-200"
            />
            <input
                type="date"
                name="returnDateFrom"
                value={searchParams.returnDateFrom}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#10538A] transition duration-200"
            />
            <input
                type="date"
                name="returnDateTo"
                value={searchParams.returnDateTo}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#10538A] transition duration-200"
            />
            <input
                type="text"
                name="customerCode"
                value={searchParams.customerCode}
                onChange={handleInputChange}
                placeholder="Customer Code"
                className="border border-gray-400 p-2 rounded-md w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#10538A] transition duration-200"
            />
            <input
                type="text"
                name="routeCode"
                value={searchParams.routeCode}
                onChange={handleInputChange}
                placeholder="Route Code"
                className="border border-gray-400 p-2 rounded-md w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#10538A] transition duration-200"
            />
            <select
                name="status"
                value={searchParams.status}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#10538A] transition duration-200"
            >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
            </select>
            <button
                onClick={handleSearch}
                className="bg-[#10538A] text-white p-2 rounded-md hover:bg-[#0a3d7a] transition duration-200 w-full sm:w-auto"
            >
                Search
            </button>
        </div>
    );
};

export default SearchFilter;
