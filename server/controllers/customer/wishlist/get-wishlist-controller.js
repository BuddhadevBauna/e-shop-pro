import WishList from "../../../models/wishlist-model.js";

const getWishListItemsWithPagination = async (req, res) => {
    try {
        const { user, page, limit } = req.query;

        if (!user) return res.status(400).json({ message: "Missing required field." });

        const existingWishlist = await WishList.find({ user })
            .sort({ createdAt: - 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("product")
            .lean();
        
        if (!existingWishlist || existingWishlist.length === 0) {
            return res.status(400).json({ message: "No wishlist items found." });
        }

        const totalCount = await WishList.countDocuments({ user });

        return res.status(200).json({
            wishlists: existingWishlist,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
            hasMore: page * limit < totalCount
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error." });
    }
}

const getWishListItemsWithoutPagination = async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ message: "Missing required field." });

        const existingWishlist = await WishList.find({ user });

        if (!existingWishlist || existingWishlist.length === 0) {
            return res.status(400).json({ message: "No wishlist items found." });
        }

        return res.status(200).json({wishlists: existingWishlist});
    } catch (error) {
        return res.status(500).json({ message: "Server Error." });
    }
}

export {getWishListItemsWithPagination, getWishListItemsWithoutPagination};