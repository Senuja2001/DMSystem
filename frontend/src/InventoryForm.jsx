import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      {/* Header Section */}
      <div className="header">
        <h1 className="text-center my-4">Distributor Management System</h1>
      </div>

      <nav className="navbar navbar-expand-lg navbar-custom">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="#">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#">Customer</Link></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                Order
              </a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">Order to Principal</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                Inventory
              </a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/inventory-summary">Inventory Summary</Link>
                <Link className="dropdown-item" to="/stock-receipt">Stock Receipt</Link>
                <Link className="dropdown-item" to="/inventory-form">Stock Adjustment</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                Sales
              </a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">New Order</Link>
                <Link className="dropdown-item" to="#">Invoice</Link>
                <Link className="dropdown-item" to="#">Picklist</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">
                Return
              </a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">Add Return</Link>
                <Link className="dropdown-item" to="#">Credit Note</Link>
                <Link className="dropdown-item" to="#">Manage Returns</Link>
              </div>
            </li>
            <li className="nav-item"><Link className="nav-link" to="#">Promotion</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#">Complain</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

function InventoryForm() {
  const [formData, setFormData] = useState({
    warehouseCode: '',
    warehouseDescription: '',
    productCode: '',
    productDescription: '',
    quantityOnHand: '',
    quantityAvailable: '',
    quantityAllocated: '',
    cost: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
        warehouseCode: formData.warehouseCode,
        warehouseDescription: formData.warehouseDescription,
        productCode: formData.productCode,
        productDescription: formData.productDescription,
        quantityOnHand: Number(formData.quantityOnHand),
        quantityAvailable: Number(formData.quantityAvailable),
        quantityAllocated: Number(formData.quantityAllocated),
        cost: Number(formData.cost),
        price: Number(formData.price)
    };

    axios.post('http://localhost:8070/Item/add', updatedData)
        .then(response => {
            console.log('Data submitted successfully:', response.data);
        })
        .catch(error => {
            console.error('There was an error submitting the data:', error);
        });
};
  
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <fieldset className="border p-4 mb-4">
          <legend className="w-auto px-2">Add Item:</legend>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="warehouseCode">Warehouse Code:</label>
              <input
                type="text"
                className="form-control"
                id="warehouseCode"
                name="warehouseCode"
                value={formData.warehouseCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="warehouseDescription">Warehouse Description:</label>
              <input
                type="text"
                className="form-control"
                id="warehouseDescription"
                name="warehouseDescription"
                value={formData.warehouseDescription}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="productCode">Product Code:</label>
              <input
                type="text"
                className="form-control"
                id="productCode"
                name="productCode"
                value={formData.productCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="productDescription">Product Description:</label>
              <input
                type="text"
                className="form-control"
                id="productDescription"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="quantityOnHand">Quantity on Hand:</label>
              <input
                type="number"
                className="form-control"
                id="quantityOnHand"
                name="quantityOnHand"
                value={formData.quantityOnHand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="quantityAvailable">Quantity Available:</label>
              <input
                type="number"
                className="form-control"
                id="quantityAvailable"
                name="quantityAvailable"
                value={formData.quantityAvailable}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="quantityAllocated">Quantity Allocated:</label>
              <input
                type="number"
                className="form-control"
                id="quantityAllocated"
                name="quantityAllocated"
                value={formData.quantityAllocated}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="cost">Cost:</label>
              <input
                type="number"
                className="form-control"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary float-right">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default InventoryForm;
