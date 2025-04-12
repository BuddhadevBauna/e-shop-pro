import WishList from "../../../models/wishlist-model.js";

const deleteWishList = async (req, res) => {
    try {
        const {user, product} = req.body;

        if(!user || !product) return res.status(400).json({message: "Missing required field."});

        const deletedItem = await WishList.findOneAndDelete({ user, product });

        if (!deletedItem) {
            return res.status(404).json({ message: "Wishlist item not found." });
        }

        return res.status(200).json({message: "Wishlist item deleted successfullly."});
    } catch (error) {
        return res.status(500).json({message: "Server error."});
    }
}

export default deleteWishList;