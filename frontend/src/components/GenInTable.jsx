import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Actions from './Actions';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import GenerateReport from '../GenerateReport';




function InventoryTable() {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        // Fetch your inventory data here and set it in state
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8070/Item'); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setInventoryData(data);
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchData();
    }, []);

  useEffect(() => {
    axios.get('http://localhost:8070/Item')
      .then((response) => {
        setItems(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`http://localhost:8070/Item/delete/${id}`)
        .then((response) => {
          console.log('Item deleted:', response.data);
          setItems(items.filter(item => item._id !== id));
        })
        .catch(error => {
          console.error('Error deleting item:', error);
        });
    }
  };

  const navigate = useNavigate();  // Hook called in the body of the functional component

  const handleUpdate = (id) => {
    console.log('Update item:', id);
    navigate(`/update-item/${id}`);  // Navigate when button is clicked
  };

  return (
    <div className='container'>
      {loading ? (
        <p>Loading inventory data...</p>
      ) : (
        <table id="inventoryTable" className="table">
          <thead>
            <tr>
              <th>Warehouse Code</th>
              <th>Warehouse Description</th>
              <th>Product Code</th>
              <th>Product Description</th>
              <th>Quantity on Hand</th>
              <th>Quantity Available</th>
              <th>Quantity Allocated</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody >
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id} >
                  <td className="text-center">{item.WarehouseCode}</td>
                  <td className="text-center">{item.WarehouseDescription}</td>
                  <td className="text-center">{item.ProductCode}</td>
                  <td className="text-center">{item.ProductDescription}</td>
                  <td className="text-center">{item.QuantityonHand}</td>
                  <td className="text-center">{item.QuantityAvailable}</td>
                  <td className="text-center">{item.QuantityAllocated}</td>
                  <td className="text-center">{item.Cost.toFixed(2)}</td>
                  <td className="text-center">{item.Price.toFixed(2)}</td>
                  <td className="text-center">
                    <div className='d-flex'>
                    <button 
                      className="custom-btn custom-btn-primary d-inline-block mr-2"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Update
                    </button>
                    <button 
                      className="custom-btn custom-btn-danger d-inline-block"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Pagination />
      <Actions />
    </div>
  );
}

export default InventoryTable;
