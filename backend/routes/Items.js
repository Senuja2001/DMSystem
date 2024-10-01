const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../models/InItem');
const csvStringify = require('csv-stringify');


router.post("/add", async (req, res) => {
    console.log("Received data:", req.body);
    try {
        const {
            WarehouseCode,
            WarehouseDescription,
            ProductCode,
            ProductDescription,
            QuantityonHand,
            QuantityAvailable,
            QuantityAllocated,
            Cost,
            Price
        } = req.body;

        const item = new Item({
            WarehouseCode,
            WarehouseDescription,
            ProductCode,
            ProductDescription,
            QuantityonHand: Number(QuantityonHand),
            QuantityAvailable: Number(QuantityAvailable),
            QuantityAllocated: Number(QuantityAllocated),
            Cost: Number(Cost),
            Price: Number(Price)
        });

        await item.save();
        res.status(200).json({ message: "Item added successfully" });
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: "Error adding item", error: error.message });
    }
});

router.route('/').get(async (req, res) => {
    const { warehouseCode, productCode } = req.query;
    
    let query = {};
    
    if (warehouseCode) {
        query.WarehouseCode = { $regex: warehouseCode, $options: 'i' };  // Case-insensitive partial match
    }
    if (productCode) {
        query.ProductCode = { $regex: productCode, $options: 'i' };
    }
    
    try {
        const items = await Item.find(query);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error: error.message });
    }
});



// Read (Get Item by ID)
router.route("/:id").get(async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: "Error fetching item", error: error.message });
    }
});

// Update (Modify Item)
router.route("/update/:id").put(async (req, res) => {
    try {
        const {
            WarehouseCode,
            WarehouseDescription,
            ProductCode,
            ProductDescription,
            QuantityonHand,
            QuantityAvailable,
            QuantityAllocated,
            Cost,
            Price
        } = req.body;

        const item = await Item.findByIdAndUpdate(req.params.id, {
            WarehouseCode,
            WarehouseDescription,
            ProductCode,
            ProductDescription,
            QuantityonHand: Number(QuantityonHand),
            QuantityAvailable: Number(QuantityAvailable),
            QuantityAllocated: Number(QuantityAllocated),
            Cost: Number(Cost),
            Price: Number(Price)
        }, { new: true });

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item updated successfully", item });
    } catch (error) {
        res.status(500).json({ message: "Error updating item", error: error.message });
    }
});

// Delete (Remove Item)
router.route("/delete/:id").delete(async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error: error.message });
    }
});




router.get('/report', async (req, res) => {
    try {
        console.log("Fetching inventory items...");
        const items = await Item.find(); // Fetch inventory items
        
        // Create CSV data with the exact field names from the schema
        const csvData = items.map(item => ({
            WarehouseCode: item.WarehouseCode,
            WarehouseDescription: item.WarehouseDescription,
            ProductCode: item.ProductCode,
            ProductDescription: item.ProductDescription,
            QuantityonHand: item.QuantityonHand, // Match this exactly as per schema
            QuantityAvailable: item.QuantityAvailable,
            QuantityAllocated: item.QuantityAllocated,
            Cost: item.Cost,
            Price: item.Price
        }));

        // Your logic to generate CSV and respond to the client goes here...

    } catch (error) {
        console.error("Error in report generation:", error);
        res.status(500).json({ message: 'Error generating report', error: error.message });
    }
});

module.exports = router;

