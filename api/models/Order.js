const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 },
        }
    ], 
    amount: { type: Number, required: true },
    shippingAddress: { type: Object, required: false },
    status: { type: String, required: true, default: 'Pending' },
}, { timestamps: true });


module.exports = mongoose.model('Order', OrderSchema);