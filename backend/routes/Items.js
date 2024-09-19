const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("../models/InItem");

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
    try {
        const items = await Item.find();
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
            QueantityAllocated,
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
            QueantityAllocated: Number(QueantityAllocated),
            Cost: mongoose.Types.Decimal128.fromString(Cost),
            Price: mongoose.Types.Decimal128.fromString(Price)
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


module.exports = router;
