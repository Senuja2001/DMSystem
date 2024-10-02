// App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Formapp from './pages/Home.jsx'; 
import Form from './pages/form.jsx'; 
import ComplaintDetail from './pages/showdetail.jsx';
import Tracking from './pages/track.jsx';
import ComplaintNotice from './pages/ComplaintNotice.jsx';
import { Navbar } from './pages/Navbar.jsx';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

function App() {
  return (
    <div>
      <Navbar /> 
      <ToastContainer /> {/* Add ToastContainer here */}
      <Routes>
        <Route index element={<Form/>} /> 
        <Route path="/form" element={<Formapp/>} /> 
        <Route path="/complaint/:id" element={<ComplaintDetail/>} />
        <Route path="/Tracking" element={<Tracking />} /> 
        <Route path="/ComplaintNotice" element={<ComplaintNotice/>} /> 
      </Routes>
    </div>
  );
}

export default App;
 