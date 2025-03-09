import Product from "../../../models/product-model.js";
import Review from "../../../models/review-model.js";

const reviewProducts = async(req, res) => {
    try {
        const {userId} = req.params;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const reviews = await Review.find({reviewOwner: userId}).populate("product");
        // console.log(reviews);
        return res.status(200).json(reviews);
    } catch (error) {
        // console.error(error);
        return res.status(500).json({message: "Review products find unsuccessful"});
    }
}

export default reviewProducts;