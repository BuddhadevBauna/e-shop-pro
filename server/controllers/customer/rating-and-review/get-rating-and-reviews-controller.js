import Review from "../../../models/review-model.js";

const ratingAndReviewProducts = async (req, res) => {
    try {
        const { userId, page, limit } = req.query;
        // console.log(userId, page, limit);

        if (!userId || !page || !limit) {
            return res.status(400).json({ message: "Missing required field." });
        }

        const reviews = await Review.find({ reviewOwner: userId, reviewDescription: { $exists: true, $ne: "" } })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("product")
            .lean();
        // console.log(reviews);

        if(!reviews || reviews.length === 0) {
            return res.status(404).json({message: "No reviews found."});
        }

        const totalCount = await Review.countDocuments({ reviewOwner: userId, reviewDescription: { $exists: true, $ne: "" } });
        // console.log(totalCount);

        return res.status(200).json({
            reviews: reviews,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
            hasMore: page * limit < totalCount
        });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Review products find unsuccessful" });
    }
}

export default ratingAndReviewProducts;