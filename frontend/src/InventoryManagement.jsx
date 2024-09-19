import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';
import { Link } from 'react-router-dom';

function InventoryManagement() {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8070/Item/');
        setInventoryData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="header">
        <h1>Distributor Management System</h1>
      </div>

      <nav className="navbar navbar-expand-lg navbar-custom">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link" href="#">Dashboard</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Customer</a></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Order</a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Order to Principal</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                Inventory
              </a>
              <div className="dropdown-menu">
                <Link to="/inventory-summary" className="dropdown-item">Inventory Summary</Link>
                <Link to="/stock-receipt" className="dropdown-item">Stock Receipt</Link>
                <Link to="/inventory-form" className="dropdown-item">Stock Adjustment</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Sales</a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">New Order</a>
                <a className="dropdown-item" href="#">Invoice</a>
                <a className="dropdown-item" href="#">Picklist</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Return</a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Add Return</a>
                <a className="dropdown-item" href="#">Credit Note</a>
                <a className="dropdown-item" href="#">Manage Returns</a>
              </div>
            </li>
            <li className="nav-item"><a className="nav-link" href="#">Promotion</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Complain</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content Section */}
      <div className="container">
      <h1 style={{ marginTop: '20px', marginBottom: '10px' }}>Inventory</h1>
        <form>
          <fieldset className="border p-4 mb-4">
            <legend className="w-auto px-2">Filter:</legend>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="WHCode">Ware House Code:</label>
                <input type="text" className="form-control" id="WHCode" name="WHCode" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="Wdes">Warehouse Description:</label>
                <input type="text" className="form-control" id="Wdes" name="Wdes" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="return">Product Code:</label>
                <input type="text" className="form-control" id="return" name="return" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="customer">Product Description:</label>
                <input type="text" className="form-control" id="customer" name="customer" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="quantityOnHand">Quantity on Hand:</label>
                <input type="text" className="form-control" id="quantityOnHand" name="quantityOnHand" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="quantityAvailable">Quantity Available:</label>
                <input type="text" className="form-control" id="quantityAvailable" name="quantityAvailable" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="quantityAllocated">Quantity Allocated:</label>
                <input type="text" className="form-control" id="quantityAllocated" name="quantityAllocated" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="cost">Cost:</label>
                <input type="text" className="form-control" id="cost" name="cost" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="price">Price:</label>
                <input type="text" className="form-control" id="price" name="price" />
              </div>
            </div>
            <button type="submit" className="btn btn-custom float-right">Search</button>
          </fieldset>
        </form>
        {/* Button Group Section */}
        <div className="btn-group btn-group-custom float-right mb-4" role="group">
          <button type="button" className="btn">Add New</button>
        </div>

        {/* Table Section */}
        <table className="table table-bordered table-striped">
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
            </tr>
          </thead>
          <tbody>
            {inventoryData.map(item => (
              <tr key={item._id}>
                <td>{item.WarehouseCode}</td>
                <td>{item.WarehouseDescription}</td>
                <td>{item.ProductCode}</td>
                <td>{item.ProductDescription}</td>
                <td>{item.QuantityonHand}</td>
                <td>{item.QuantityAvailable}</td>
                <td>{item.QuantityAllocated}</td>
                <td>{item.Cost.$numberDecimal}</td>
                <td>{item.Price.$numberDecimal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="pagination d-flex justify-content-between">
          <p>Showing 1 to {inventoryData.length} of {inventoryData.length} records</p>
          <nav>
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">&#171; First</a></li>
              <li className="page-item"><a className="page-link" href="#">&#8249; Previous</a></li>
              <li className="page-item"><a className="page-link" href="#">Next &#8250;</a></li>
              <li className="page-item"><a className="page-link" href="#">Last &#187;</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default InventoryManagement;
