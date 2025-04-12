import mongoose from "mongoose";
import Cart from "../../../models/cart/cart-model.js";
import Product from "../../../models/product-model.js";

const mergeGuestCart = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const { user, guestCart } = req.body;
        if (!user || !guestCart) {
            return res.status(400).json({ message: "Missing required field." });
        }

        const sanitizedCart = [];
        for (const item of guestCart) {
            const product = await Product.findById(item.product).select("stock maxOrderQuantity");
            if (!product || product.stock <= 0) continue;
            // console.log(product);

            let quantity = item.quantity;
            if (!quantity || quantity <= 0) quantity = 1;
            if (quantity > product.stock || quantity > product.maxOrderQuantity) {
                quantity = Math.min(product.stock, product.maxOrderQuantity);
                // console.log(quantity);
            }

            sanitizedCart.push({ ...item, quantity });
        }

        await session.withTransaction(async () => {
            let cart = await Cart.findOne({ user }).session(session);
            if (!cart) {
                cart = new Cart({
                    user: user,
                    items: sanitizedCart
                })
                await cart.save({ session });
            } else {
                const existingProductIds = cart.items.map(item => item.product.toString());
                const uniqueGuestCart = sanitizedCart.filter(guestItem => !existingProductIds.includes(guestItem.product));
                await Cart.updateOne(
                    { user },
                    { $push: { items: { $each: uniqueGuestCart } } },
                    { session }
                )
            }
        });

        session.endSession();
        return res.status(200).json({ message: "Cart merged successfully" });
    } catch (error) {
        // console.log(error);
        session.endSession();
        return res.status(500).json({ message: "Failed to merge cart" });
    }
}

export default mergeGuestCart;