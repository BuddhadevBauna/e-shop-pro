import mongoose from "mongoose";
import Product from "../../../models/product-model.js";
import Review from "../../../models/review-model.js";

const addReview = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { product, reviewOwner, ...rest } = req.body;
        // console.log(product, reviewOwner, rest);

        const productExists = await Product.findById(product).session(session);
        if (!productExists) {
            throw new Error("Product not found.");
        }

        const existingReview = await Review.findOne({ product, reviewOwner }).session(session);
        if (existingReview) {
            throw new Error("You have already reviewed this product. You can't review this product again.");
        }

        const newReview = new Review({ product, reviewOwner, ...rest });
        await newReview.save({ session });

        const allReviews = await Review.find({ product }).session(session);
        const totalReviews = allReviews.length;
        let sum = 0;
        for (let i = 0; i < totalReviews; i++) sum += allReviews[i].rating;
        const averageRating = totalReviews > 0 ? sum / totalReviews : 0;

        await Product.findByIdAndUpdate(
            product,
            {
                $push: { reviews: newReview._id },
                $set: { rating: averageRating.toFixed(1) }
            },
            { new: true, session }
        );

        await session.commitTransaction();
        return res.status(201).json({ message: "Review added successfully." });
    } catch (error) {
        // console.error(error);
        await session.abortTransaction();
        return res.status(400).json({ message: error.message });
    } finally {
        session.endSession();
    }
}

export default addReview;