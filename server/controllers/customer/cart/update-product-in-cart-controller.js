import Cart from "../../../models/cart/cart-model.js";
import Product from "../../../models/product-model.js";

const updateProductInCart = async (req, res) => {
    try {
        const {userID, productId} = req.query;
        const {quantity} = req.body;
        // console.log(userID, productId, quantity);

        if(!userID || !productId || !quantity) return res.status(400).json({message: "Missing required fields."});
        if (quantity < 1) return res.status(400).json({message: "Quantity must be at least 1."});

        const productToBeUpdated = await Product.findOne({_id: productId});
        if(!productToBeUpdated) return res.status(400).json({message: "Product not found."});
        if(productToBeUpdated.isDeleted) return res.status(400).json({message: "Product is not available now."});
        if(productToBeUpdated.stock === 0) return res.status(400).json({message: "Product is out of stock."});
        if(quantity > productToBeUpdated.maxOrderQuantity) return res.status(400).json({message: `You can only order up to ${productToBeUpdated.maxOrderQuantity} units of this product.`});
        if (quantity > productToBeUpdated.stock) return res.status(400).json({ message: "Requested quantity exceeds available stock." });

        const updatedCart = await Cart.findOneAndUpdate(
            { user: userID, 'items.product': productId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true, runValidators: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart item not found or quantity update unsuccessful' });
        }
        return res.status(200).json({ message: 'Cart item quantity updated successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
}

export default updateProductInCart;