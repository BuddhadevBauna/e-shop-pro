import express from "express";
import addProductInCart from "../controllers/cart/add-product-in-cart-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = express.Router();

//add product in cart
router.route('/add').post(authMiddleware, addProductInCart);
//get cart item of particular user
router.route('').get();

export default router;