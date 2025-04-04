import Cart from "../../../models/cart/cart-model.js";
import Product from "../../../models/product-model.js";

const addProductInCart = async (req, res) => {
    try {
        const {user, product, quantity} = req.body;
        // console.log({user, product, quantity});

        if (!user || !product || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const productToBeAdded = await Product.findOne({_id: product});
        // console.log(productToBeAdded);
        if(!productToBeAdded) return res.status(400).json({message: "Product not found."});
        if(productToBeAdded.isDeleted) return res.status(400).json({message: "Product is not available now."});
        if(productToBeAdded.stock === 0) return res.status(400).json({message: "Product is out of stock."});

        let cart = await Cart.findOne({ user });
        if (!cart) {
            cart = new Cart({
                user: user,
                items: [{ product, quantity }]
            });
            await cart.save();
            return res.status(200).json({ message: "Product added to cart" });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { user, "items.product": { $ne: product } }, // Check if product does not exist
            { $push: { items: { product, quantity } } }, // Add product if not present
            { new: true }
        );
        if (updatedCart) {
            return res.status(200).json({ message: "Product added to cart" });
        } else {
            return res.status(400).json({ message: "Product already exists in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add product in cart"});
    }
}

export default addProductInCart;