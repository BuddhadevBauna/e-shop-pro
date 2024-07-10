import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    reviewHeading: {
        type: String,
        required: true
    },
    reviewDescription: {
        type: String,
        required: true
    },
    reviewerName: {
        type: String,
        required: true
    }
})

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
    },
    warrantyInformation: {
        type: String,
        required: true
    },
    shippingInformation: {
        type: String,
        required: true
    },
    availabilityStatus: {
        type: String,
        required: true
    },
    returnPolicy: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of strings
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    reviews: {
        type: [reviewSchema],
        default: []
    }
});


const Product = new mongoose.model("Product", productSchema);
export default Product;