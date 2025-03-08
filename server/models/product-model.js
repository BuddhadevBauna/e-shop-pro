import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {type: Number, required: true},
    reviewHeading: {type: String, required: true},
    reviewDescription: {type: String, required: true},
    reviewOwner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }
})

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String,required: true},
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", 
        required: true 
    },
    price: {type: Number, required: true},
    discountPercentage: {type: Number, required: true},
    rating: {type: Number, required: true},
    stock: {type: Number, required: true},
    brand: {type: String},
    warrantyInformation: {type: String, required: true},
    shippingInformation: {type: String, required: true},
    availabilityStatus: {type: String, required: true},
    returnPolicy: {type: String, required: true},
    images: {type: [String], required: true},
    thumbnail: {type: String, required: true},
    reviews: {type: [reviewSchema], default: []}
});

const Product = new mongoose.model("Product", productSchema);
export default Product;