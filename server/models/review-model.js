import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    reviewOwner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    rating: {type: Number, required: true},
    reviewHeading: {type: String},
    reviewDescription: {type: String},
}, {timestamps: true});

const Review = new mongoose.model('Review', reviewSchema);
export default Review;