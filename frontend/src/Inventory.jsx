import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import FilterForm from './components/FilterForm';
import InventoryTable from './components/InventoryTable';

function Inventory() {
  // State to hold the filter data
  const [filterData, setFilterData] = useState({
    warehouseCode: '',
    productCode: ''
  });

  // Handler to update the filter state
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value
    });
  };

  return (
    <div>
      <Header />
      <Navbar />
      <FilterForm 
        filterData={filterData}
        handleFilterChange={handleFilterChange} 
      />
      <InventoryTable filterData={filterData} />
    </div>
  );
}

export default Inventory;
