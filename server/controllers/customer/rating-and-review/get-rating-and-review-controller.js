import Review from "../../../models/review-model.js";

const getRatingAndReview = async (req, res) => {
    try {
        const { product, reviewOwner } = req.query;
        // console.log(product, reviewOwner);

        let ratingAndReview = await Review.findOne({ product, reviewOwner });
        // console.log(ratingAndReview);
        return res.status(200).json({ ratingAndReview });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export default getRatingAndReview;