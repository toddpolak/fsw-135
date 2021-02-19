const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Inventory Blueprint
const inventorySchema = new Schema({
    item: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    quantity: Number
})

module.exports = mongoose.model('Inventory', inventorySchema)
