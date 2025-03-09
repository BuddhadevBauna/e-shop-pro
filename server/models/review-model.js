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
    reviewHeading: {type: String, required: true},
    reviewDescription: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const Review = new mongoose.model('Review', reviewSchema);
export default Review;