const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    category: {type:Array },
    size: {type: Array },
    color: {type: Array },
    countInStock: {type: Boolean, default: true},
}, {timestamps: true});


module.exports = mongoose.model('Product', ProductSchema);