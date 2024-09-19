const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    WarehouseCode: {
        type: String,
        required: true
    },
    WarehouseDescription: {
        type: String
    },
    ProductCode: {
        type: String,
        required: true
    },
    ProductDescription: {
        type: String
    },
    QuantityonHand: {
        type: Number,
        required: true
    },
    QuantityAvailable: {
        type: Number,
        required: true
    },
    QuantityAllocated: {
        type: Number,
        required: true
    },
    Cost: {
        type: Number,
        required: true
    },
    Price: {
        type: Number,
        required: true
    }
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
