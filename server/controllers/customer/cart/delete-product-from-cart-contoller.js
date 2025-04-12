import Cart from "../../../models/cart/cart-model.js";

const deleteCartProduct = async (req, res) => {
    try {
        const { userID, productId } = req.query;

        if (!userID || !productId) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const result = await Cart.updateOne(
            { user: userID },
            { $pull: { items: { product: productId } } }
        );

        if (!result.matchedCount) {
            return res.status(404).json({ message: "Cart not found for user" });
        }

        if (!result.modifiedCount) {
            return res.status(400).json({ message: "Product not found in cart" });
        }

        return res.status(200).json({ message: "Cart item deleted successfully." });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Server Error." });
    }
}

export default deleteCartProduct;