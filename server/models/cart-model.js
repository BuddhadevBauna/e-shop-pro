import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: { type: Number, required: true, min: 1 }
        }
    ]
}, { timestamps: true });

cartSchema.virtual("cartSummery").get(function() {
    let cartFinalMRP = 0;
    let cartFinalDiscount = 0;
    let cartFinalPrice = 0;
    const cartItems = this.items.map((item) => {
        const {product, quantity} = item;
        const totalMRP = parseFloat((product.mrp * quantity).toFixed(2));
        const totalDiscount = parseFloat((totalMRP * (product.discountPercentage / 100)).toFixed(2));
        const totalSalePrice = parseFloat((totalMRP - totalDiscount).toFixed(2));
        
        cartFinalMRP += totalMRP;
        cartFinalDiscount += totalDiscount;
        cartFinalPrice += totalSalePrice;
        return {product, quantity, totalMRP, totalDiscount, totalSalePrice};
    });
    cartFinalMRP = parseFloat(cartFinalMRP.toFixed(2));
    cartFinalDiscount = parseFloat(cartFinalDiscount.toFixed(2));
    cartFinalPrice = parseFloat(cartFinalPrice.toFixed(2));
    return {cartItems, cartFinalMRP, cartFinalDiscount, cartFinalPrice};
});

cartSchema.set("toJSON", { virtuals: true });
cartSchema.set("toObject", { virtuals: true });

const Cart = new mongoose.model("Cart", cartSchema);

export default Cart;