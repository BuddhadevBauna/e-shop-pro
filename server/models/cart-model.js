import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
});

const userCartSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true
    },
    cartItems: {
        type: [cartSchema],
        default: []
    }
})

const Cart = new mongoose.model("Cart", userCartSchema);

export default Cart;