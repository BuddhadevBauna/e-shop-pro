import Cart from "../../../models/cart-model.js";

const productsOfCartOfParticularUser = async (req, res) => {
    try {
        const {userId} = req.query;

        const cartItems = await Cart.findOne({user : userId}).populate('items.product');
        if(cartItems) {
            return res.status(200).json(cartItems);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "get cart items unsucessful"});
    }
}

export default productsOfCartOfParticularUser;