import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routes
import Header from './components/Header';
import Navbar from './components/Navbar';

function UpdateItem (){

    const { id } = useParams(); // Get item ID from URL parameters
    const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState(null);      // Track error state

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/item/${id}`);
                setFormData({
                    warehouseCode: response.data.WarehouseCode,
                    warehouseDescription: response.data.WarehouseDescription,
                    productCode: response.data.ProductCode,
                    productDescription: response.data.ProductDescription,
                    quantityOnHand: response.data.QuantityonHand,
                    quantityAvailable: response.data.QuantityAvailable,
                    quantityAllocated: response.data.QuantityAllocated,
                    cost: response.data.Cost,
                    price: response.data.Price
                });
                setLoading(false);  
            } catch (error) {
                setError(error.message);
                setLoading(false); 
            }
        };

        fetchData();
    }, [id]); 
    const updatedData = {
        WarehouseCode: formData.warehouseCode,
        WarehouseDescription: formData.warehouseDescription,
        ProductCode: formData.productCode,
        ProductDescription: formData.productDescription,
        QuantityonHand: Number(formData.quantityOnHand),
        QuantityAvailable: Number(formData.quantityAvailable),
        QuantityAllocated: Number(formData.quantityAllocated),
        Cost: parseFloat(formData.cost),  // Ensure decimal values are correctly parsed
        Price: parseFloat(formData.price)  // Ensure decimal values are correctly parsed
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data before submitting:", updatedData);

        axios.put(`http://localhost:8070/Item/update/${id}`, updatedData) // Fixed URL and method
            .then(response => {
                console.log('Data submitted successfully:', response.data);
                alert('Data successfully added to the database!');
            })
            .catch(error => {
                console.error('There was an error submitting the data:', error);
                alert('Data adding fail to the database!');
            });
    };

    if (loading) {
        return <p>Loading inventory data...</p>; // Display loading message
    }

    if (error) {
        return <p>Error fetching data: {error}</p>; // Display error message
    }

    return (
        <div>
            <Header />
            <Navbar />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <fieldset className="border p-4 mb-4">
                        <legend className="w-auto px-2">Restock Item:</legend>
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
                                    readOnly
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
                                    readOnly
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
                                    readOnly
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
                                    readOnly
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
                                    step="0.01"  // Allow decimal values
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
                                    step="0.01"  // Allow decimal values
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
        
        )
}
export default UpdateItem;