import Header from './Header.jsx';
import axios from 'axios';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

function FilterForm({ filterData, handleFilterChange }){

    return (
        <div className="container">
      
      <form>
        <fieldset className="border p-4 mb-4">
          <legend className="w-auto px-2">Filter Data:</legend>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="warehouseCode">Warehouse Code:</label>
              <input
                type="text"
                className="form-control"
                id="warehouseCode"
                name="warehouseCode"
                value={filterData.warehouseCode}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="warehouseDescription">Warehouse Description:</label>
              <input
                type="text"
                className="form-control"
                id="warehouseDescription"
                name="warehouseDescription"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="productCode">Product Code:</label>
              <input
                type="text"
                className="form-control"
                id="productCode"
                name="productCode"
                value={filterData.productCode}
                onChange={handleFilterChange}
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
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="quantityOnHand">Quantity on Hand:</label>
              <input
                type="number"
                className="form-control"
                id="quantityOnHand"
                name="quantityOnHand"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="quantityAvailable">Quantity Available:</label>
              <input
                type="number"
                className="form-control"
                id="quantityAvailable"
                name="quantityAvailable"
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
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="cost">Cost:</label>
              <input
                type="number"
                className="form-control"
                id="cost"
                name="cost"
                step="0.01"
                
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                step="0.01"
               
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary float-right">Filer</button>
        </fieldset>
      </form>
    </div>
    );
}

export default FilterForm;
