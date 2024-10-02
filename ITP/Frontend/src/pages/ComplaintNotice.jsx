import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ComplaintNotice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [complaint, setComplaint] = useState(null);  // To store fetched complaint data
  const [status, setStatus] = useState('');           // To store current status (pending/completed)
  const [completionDate, setCompletionDate] = useState(''); // Store completion date for completed status
  const [expectedFinishDate, setExpectedFinishDate] = useState(''); // Store expected finish date for pending status
  const [error, setError] = useState(null);           // Error handling state
  const [email, setEmail] = useState('');             // Store email address for notification

  // Fetch complaint details on component mount
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/complain/get`);
        console.log("Fetched complaint data:", response.data); // Debugging
        setComplaint(response.data);
        setStatus(response.data.status); // Set status from fetched data
      } catch (err) {
        console.error('Error fetching complaint details:', err);
        setError('Unable to fetch complaint details. Please try again later.');
      }
    };

    fetchComplaint();
  }, [id]);

  // Handle status update form submission
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    
    // Build the updated complaint object with new status and dates
    const updatedComplaint = {
      ...complaint,
      status,
      completionDate: status === 'completed' ? completionDate : expectedFinishDate,
    };

    try {
      await axios.put(`http://localhost:5000/complain/update/${id}`, updatedComplaint);
      console.log('Complaint updated successfully'); // Debugging
      navigate('/tracking'); // Redirect to tracking dashboard after successful update
    } catch (err) {
      console.error('Error updating complaint:', err);
      setError('Failed to update complaint status. Please try again.');
    }
  };

  // Send email notification logic
  const handleEmailNotification = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter an email address.');
      return;
    }

    try {
      // Logic to send email via backend
      await axios.post(`http://localhost:5000/complain/notify`, {
        complaintId: complaint._id,
        email,
      });

      console.log(`Email sent to: ${email} regarding complaint: ${complaint._id}`);
      alert(`Email sent to: ${email} regarding complaint ID: ${complaint._id}`);
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send email. Please try again.');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!complaint) {
    return <div>Loading...</div>;  // Show loading until the complaint data is fetched
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Complaint Details</h1>

      <div className="bg-white p-6 rounded-md shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Complaint Information</h2>
        <p><strong>Name:</strong> {complaint.firstName} {complaint.lastName}</p>
        <p><strong>Username:</strong> {complaint.username}</p>
        <p><strong>City:</strong> {complaint.city}</p>
        <p><strong>Code:</strong> {complaint.code}</p>
        <p><strong>Complain Date:</strong> {new Date(complaint.complain_date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {complaint.status}
        </span></p>
        <p><strong>Complain:</strong> {complaint.complain}</p>
      </div>

      <form onSubmit={handleUpdateStatus} className="bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Update Complaint Status</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        {status === 'completed' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Completion Date</label>
            <input 
              type="date"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        {status === 'pending' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Expected Finish Date</label>
            <input 
              type="date"
              value={expectedFinishDate}
              onChange={(e) => setExpectedFinishDate(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update Status</button>
      </form>

      {/* Email Notification Form */}
      <form onSubmit={handleEmailNotification} className="mt-6 bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter recipient email"
            required
          />
        </div>
        <button 
          type="submit" 
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Send Email Notification
        </button>
      </form>
    </div>
  );
};

export default ComplaintNotice;
