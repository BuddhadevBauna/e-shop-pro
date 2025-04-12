import mongoose from "mongoose";
import Product from "../../../models/product-model.js";
import Review from "../../../models/review-model.js";

const addRating = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { product, reviewOwner, rating } = req.body;
        // console.log(product, reviewOwner, rating);

        const productExists = await Product.findById(product).session(session);
        if (!productExists) {
            return res.status(400).json({message: "Product not found."});
        }

        let ratingDoc = await Review.findOne({ product, reviewOwner }).session(session);
        let message = "Rating added successfully.";
        if (ratingDoc) {
            ratingDoc.rating = rating;
            await ratingDoc.save({ session });
            message =  "Rating updated successfully.";
        } else {
            ratingDoc = new Review({ product, reviewOwner, rating });
            await ratingDoc.save({ session });
        }

        const allRatings = await Review.find({ product }).session(session);
        const totalRating = allRatings.length;
        let sum = 0;
        for (let i = 0; i < totalRating; i++) sum += allRatings[i].rating;
        const averageRating = totalRating > 0 ? sum / totalRating : 0;

        await Product.findByIdAndUpdate(
            product,
            { $set: { rating: averageRating.toFixed(1) } },
            { new: true, session }
        );

        await session.commitTransaction();
        return res.status(201).json({ message });
    } catch (error) {
        // console.error(error);
        await session.abortTransaction();
        return res.status(500).json({ message: error.message });
    } finally {
        session.endSession();
    }
}

export default addRating;