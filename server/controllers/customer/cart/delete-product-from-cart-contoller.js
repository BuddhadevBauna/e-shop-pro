import Cart from "../../../models/cart-model.js";

const deleteCartProduct = async (req, res) => {
    try {
        const { userID, cartItemId } = req.query;

        if (!userID || !cartItemId) {
            return res.status(400).json({ message: "userID and cartItemId are required" });
        }

        const result = await Cart.updateOne(
            { user: userID },
            { $pull: { items: { product: cartItemId } } }
        );

        if (result.matchedCount === 0 || result.modifiedCount === 0) {
            return res.status(404).json({ message: "User cart not found" });
        }
        return res.status(200).json({ message: "Cart item deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(200).json({ message: "cart item delete unsucessful." });
    }
}

export default deleteCartProduct;