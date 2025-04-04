import mongoose from "mongoose";
import Cart from "../../../models/cart/cart-model.js";

const mergeGuestCart = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const { user, guestCart } = req.body;
        if (!user || !guestCart) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        await session.withTransaction(async () => {
            let cart = await Cart.findOne({ user }).session(session);
            if (!cart) {
                cart = new Cart({
                    user: user,
                    items: guestCart
                })
                await cart.save({ session });
            } else {
                await Cart.updateOne(
                    { user },
                    { $push: { items: { $each: guestCart } } },
                    { session }
                )
            }
        });
        
        session.endSession();
        return res.status(200).json({ message: "Cart merged successfully" });
    } catch (error) {
        console.log(error);
        session.endSession();
        return res.status(500).json({ message: "Failed to merge cart" });
    }
}

export default mergeGuestCart;