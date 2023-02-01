const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    total: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    shippingAddress: {
        type: String
    },
    billingAddress: {
        type: String
    },
    paymentMethod: {
        type: String
    },
    orderStatus: {
        type: String,
        default: "pending"
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
