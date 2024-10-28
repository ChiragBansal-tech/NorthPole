const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    price: {
        type: Number, 
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    manufacturingDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    color: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Backpack','Duffle Bags','Travel Packs'],
        required: true,
    }
},{ timestamps: true });

const Product = model('Product', productSchema);
module.exports = Product
