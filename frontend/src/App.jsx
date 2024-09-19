import React from 'react';
import InventoryManagement from './InventoryManagement';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InventoryForm from './InventoryForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InventoryManagement />} />
        <Route path="/inventory-summary" element={<InventoryManagement />}/>
        <Route path="/inventory-form" element={<InventoryForm />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
  
}

export default App;
