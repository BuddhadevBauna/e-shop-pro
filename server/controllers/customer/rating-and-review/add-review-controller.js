import mongoose from "mongoose";
import Product from "../../../models/product-model.js";
import Review from "../../../models/review-model.js";

const addReview = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { product, reviewOwner, reviewHeading, reviewDescription } = req.body;
        // console.log(product, reviewOwner, reviewHeading, reviewDescription);

        const productExists = await Product.findById(product).session(session);
        if (!productExists) {
            return res.status(400).json({ message: "Product not found." });
        }

        let reviewDoc = await Review.findOne({ product, reviewOwner }).session(session);
        if (!reviewDoc) return res.status(400).json({ message: "Rate the product first then review." });

        reviewDoc.reviewHeading = reviewHeading;
        reviewDoc.reviewDescription = reviewDescription;
        await reviewDoc.save({ session });

        await Product.findByIdAndUpdate(
            product,
            { $push : { reviews: reviewDoc._id } },
            { new: true, session }
        );

        await session.commitTransaction();
        return res.status(201).json({ message: "Review submitted successfully." });
    } catch (error) {
        // console.error(error);
        await session.abortTransaction();
        return res.status(400).json({ message: error.message });
    } finally {
        session.endSession();
    }
}

export default addReview;