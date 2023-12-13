const mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    productPrice: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    categoryName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryCollection'
    },
    collectionName: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'CollectionModel'
        
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    images: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Images" }],

    color: {
        type: String,
        required: true
    },
    
    isListed: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Export the model

const productCollection = mongoose.model("productCollection", ProductSchema);

module.exports = productCollection;