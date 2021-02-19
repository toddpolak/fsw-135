const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Inventory Blueprint
const inventorySchema = new Schema({
    item: {
        type: String,
        required: true
    },
    quantity: Number
})

module.exports = mongoose.model('Inventory', inventorySchema)
