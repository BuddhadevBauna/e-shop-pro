import WishList from "../../../models/wishlist-model.js";

const addWishList = async (req, res) => {
    try {
        const {user, product} = req.body;

        if(!user || !product) return res.status(400).json({message: "Missing required field."});

        const newWishList = new WishList({ user, product });
        await newWishList.save();

        return res.status(200).json({message: "Wishlist item added successfullly."});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Product already in wishlist." });
        }
        return res.status(500).json({message: "Server Error."});
    }
}

export default addWishList;