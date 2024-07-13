import Cart from "../../models/cart-model.js";

const deleteCartProduct = async (req, res) => {
    try {
        const { userCartID, cartItemId } = req.query;

        if (!userCartID || !cartItemId) {
            return res.status(400).json({ message: "userCartID and cartItemId are required" });
        }

        const result = await Cart.updateOne(
            { _id: userCartID },
            { $pull: { cartItems: { _id: cartItemId } } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User cart not found" });
        }

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        return res.status(200).json({ message: "Cart item deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(200).json({ message: "cart item delete not sucessful." });
    }
}

export default deleteCartProduct;