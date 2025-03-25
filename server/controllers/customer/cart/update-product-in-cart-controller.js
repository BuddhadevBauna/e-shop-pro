import Cart from "../../../models/cart-model.js";
import Product from "../../../models/product-model.js";

const updateProductInCart = async (req, res) => {
    try {
        const {userID, cartItemId} = req.query;
        const {quantity} = req.body;
        // console.log(userID, cartItemId, quantity);

        if(!userID || !cartItemId) return res.status(400).json({message: "Required fill not pass."});

        const productToBeUpdated = await Product.findOne({_id: cartItemId});
        if(!productToBeUpdated || productToBeUpdated.isDeleted) return res.status(400).json({message: "Product is not available now."});

        const updatedCart = await Cart.findOneAndUpdate(
            { user: userID, 'items.product': cartItemId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true, runValidators: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart item quantity updated unsuccessful' });
        }
        return res.status(200).json({ message: 'Cart item quantity updated successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Cart item quantity update unsuccessful' });
    }
}

export default updateProductInCart;