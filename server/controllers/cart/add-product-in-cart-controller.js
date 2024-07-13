import Cart from "../../models/cart-model.js";

const addProductInCart = async (req, res) => {
    try {
        const cartDetails = req.body;

        //find the user cart exist or not by email
        let userCart = await Cart.findOne({useremail: cartDetails.useremail});

        if(!userCart) {
            // If user cart does not exist, create a new one
            const response = await Cart.create(cartDetails);
            return res.status(201).json({ message: "Product added to cart successfully!", response});
        } else {
            // If user cart exists, update the cart items
            userCart.cartItems.push(cartDetails.cartItems);
            const response = await userCart.save();
            return res.status(200).json({ message: "Product added to cart successfully!", response });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add product to cart"});
    }
}

export default addProductInCart;