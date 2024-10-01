import React from 'react';
import Inventory from './Inventory';
import AddItem from './AddItem';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateItem from './UpdateItem';
import Report from './GenerateReport'
import StockAdgestment from './StockAdgestment'



function App() {
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/update-item/:id" element={<UpdateItem />} />
        <Route path="/report" element={<Report />} />
        <Route path="/restock/:id" element={<StockAdgestment />} />
      </Routes>
    </Router>
    );
}

export default App;
