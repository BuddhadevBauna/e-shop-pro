import Cart from "../../models/cart-model.js";

const updateProductInCart = async (req, res) => {
    try {
        const {userCartID, itemId} = req.query;
        const {quantity} = req.body;

        // Update the cart item quantity with an existence check
        const updatedCart = await Cart.findOneAndUpdate(
            { _id: userCartID, 'cartItems._id': itemId },
            { $set: { 'cartItems.$.quantity': quantity } },
            { new: true, runValidators: true }
        );

        // Check if the user or cart item was not found
        if (!updatedCart) {
            return res.status(404).json({ message: 'User cart or cart item not found' });
        }

        return res.status(200).json({ message: 'Cart item quantity updated successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Cart item quantity update unsuccessful' });
    }
}

export default updateProductInCart;