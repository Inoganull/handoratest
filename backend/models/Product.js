const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a product name"],
        time: true
    },
    description: {
        type: String,
        required: [true, "Please enter a description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter a price"],
        default: 0
    },
    media: [
        {
            url: { type: String, required: true },
            mediaType: { type: String, enum: ['image', 'video'], required: true}
        }
    ],
    category: {
        type: String,
        required: [true, "Please select a category"]
    },
    countInStock: {
        type: Number,
        required: true,
        default: 1
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true //This automatically adds createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;