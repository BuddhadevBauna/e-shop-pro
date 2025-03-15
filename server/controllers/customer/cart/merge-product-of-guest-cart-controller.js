import Cart from "../../../models/cart-model.js";

const mergeGuestCart = async (req, res) => {
    try {
        const { user, guestCart } = req.body;
        if (!user || !guestCart) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        let cart = await Cart.findOne({ user });
        if(!cart) {
            await Cart.create({user, items: guestCart});
        } else {
            const existingProductIds = new Set(cart.items.map(item => item.product.toString()));
            const newItems = guestCart.filter(item => !existingProductIds.has(item.product));
            if(newItems.length > 0) {
                await Cart.updateOne(
                    {user},
                    {$push : {items: {$each: newItems}}}
                )
            } else {
                return res.status(200).json({ message: "no unique item found to merge" });
            }
        }
        return res.status(200).json({ message: "Cart merged successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to merge cart" });
    }
}

export default mergeGuestCart;