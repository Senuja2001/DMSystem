import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner'; // Ensure you have this component for loading state

const ShowReturn = () => {
    const [returnItem, setReturnItem] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/returns/${id}`) // Adjusted endpoint
            .then((response) => {
                setReturnItem(response.data); // Use the response structure that fits your API
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]); // Add id to dependency array to re-fetch if id changes

    return (
        <div className='p-4 bg-[#E3E4FA] min-h-screen'>
            <BackButton />
            <h1 className='text-3xl my-4 text-[#092142]'>Show Return</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-[#10538A] rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Return No</span>
                        <span>{returnItem.returnNo}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Return Date</span>
                        <span>{returnItem.returnDate}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Customer Code</span>
                        <span>{returnItem.customerCode}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Route Code</span>
                        <span>{returnItem.routeCode}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Total Net Amount</span>
                        <span>{returnItem.totalNetAmount}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Status</span>
                        <span>{returnItem.status}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Create Time</span>
                        <span>{new Date(returnItem.createdAt).toString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Last Updated Time</span>
                        <span>{new Date(returnItem.updatedAt).toString()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowReturn;
