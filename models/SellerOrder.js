const mongoose = require("mongoose");

const SellerOrderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        customization: [],
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
    paymentMethod: {
        type: String
    }
}, {
    timestamps: true
});

const SellerOrder = mongoose.model("SellerOrder", SellerOrderSchema);

module.exports = SellerOrder;