import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditReturn = () => {
    const [customerCode, setCustomerCode] = useState('');
    const [routeCode, setRouteCode] = useState('184R01'); // Default value for route code
    const [totalNetAmount, setTotalNetAmount] = useState('');
    const [status, setStatus] = useState('');
    const [returnNo, setReturnNo] = useState(''); // New state for Return No
    const [returnDate, setReturnDate] = useState(''); // New state for Return Date
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/returns/${id}`) // Adjusted endpoint
            .then((response) => {
                setReturnNo(response.data.returnNo); // Fetch returnNo from the response
                setReturnDate(response.data.returnDate); // Fetch returnDate from the response
                setCustomerCode(response.data.customerCode);
                setTotalNetAmount(response.data.totalNetAmount);
                setStatus(response.data.status);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console.');
                console.log(error);
            });
    }, [id]);

    const handleUpdateReturn = () => {
        // Validate required fields
        if (!customerCode.trim() || !totalNetAmount.trim() || !returnNo.trim() || !returnDate.trim()) {
            alert('Please fill in all required fields.');
            return;
        }

        const data = {
            returnNo, // Add returnNo to the payload
            returnDate, // Add returnDate to the payload
            customerCode,
            routeCode, // Keeping the default route code
            totalNetAmount: parseFloat(totalNetAmount), // Ensure totalNetAmount is a number
            status,
        };

        setLoading(true);
        axios
            .put(`http://localhost:5555/returns/${id}`, data) // Adjusted endpoint
            .then(() => {
                setLoading(false);
                navigate('/'); // Redirect after successful update
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console.');
                console.log('Error Response:', error.response.data); // Log the error response for debugging
            });
    };

    return (
        <div className='p-4 bg-[#E3E4FA]'>
            <BackButton />
            <h1 className='text-3xl my-4 text-[#092142]'>Edit Return</h1>
            {loading && <Spinner />}
            <div className='flex flex-col border-2 border-[#10538A] rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Return No</label>
                    <input
                        type='text'
                        value={returnNo}
                        onChange={(e) => setReturnNo(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Return Date</label>
                    <input
                        type='date'
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Customer Code</label>
                    <input
                        type='text'
                        value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Route Code</label>
                    <input
                        type='text'
                        value={routeCode}
                        readOnly // Making it read-only since it has a default value
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Total Net Amount</label>
                    <input
                        type='text'
                        value={totalNetAmount}
                        onChange={(e) => setTotalNetAmount(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Status</label>
                    <input
                        type='text'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <button className='p-2 bg-[#10538A] text-white m-8 rounded' onClick={handleUpdateReturn}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default EditReturn;
