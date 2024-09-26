import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateReturn = () => {
    const [customerCode, setCustomerCode] = useState('');
    const [routeCode, setRouteCode] = useState('184R01'); // Default value for route code
    const [totalNetAmount, setTotalNetAmount] = useState('');
    const [status, setStatus] = useState('');
    const [returnNo, setReturnNo] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveReturn = () => {
        if (!customerCode.trim() || !totalNetAmount.trim() || !returnNo.trim() || !returnDate.trim()) {
            alert('Please fill in all required fields.');
            return;
        }

        const data = {
            returnNo,
            returnDate,
            customerCode: customerCode.trim(),
            routeCode,
            totalNetAmount: parseFloat(totalNetAmount),
            status: status.trim(),
        };

        console.log('Request Payload:', data);
        setLoading(true);

        axios
            .post('http://localhost:5555/returns', data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error Response:', error.response ? error.response.data : error.message);
                alert('An error occurred. Please check console for details.');
            });
    };

    return (
        <div className='p-4 bg-[#E3E4FA]'>
            <BackButton />
            <h1 className='text-3xl my-4 text-[#092142]'>Create Return</h1>
            {loading && <Spinner />}
            <div className='flex flex-col border-2 border-[#10538A] rounded-xl w-[600px] p-4 mx-auto'>
                {/* Form Inputs */}
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Return No</label>
                    <input
                        type='text'
                        value={returnNo}
                        onChange={(e) => setReturnNo(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Return Date</label>
                    <input
                        type='date'
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Customer Code</label>
                    <input
                        type='text'
                        value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Route Code</label>
                    <input
                        type='text'
                        value={routeCode}
                        onChange={(e) => setRouteCode(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full'
                        readOnly
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Total Net Amount</label>
                    <input
                        type='text'
                        value={totalNetAmount}
                        onChange={(e) => setTotalNetAmount(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full'
                        step="0.01"
                        min="0"
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full'
                    >
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
                <button className='p-2 bg-[#10538A] text-white m-8 rounded' onClick={handleSaveReturn}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default CreateReturn;
