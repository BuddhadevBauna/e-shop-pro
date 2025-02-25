import express from "express";
import addProductInCart from "../controllers/cart/add-product-in-cart-controller.js";
import productsOfCartOfParticularUser from "../controllers/cart/get-products-of-cart-of-particular-user-controler.js";
import updateProductInCart from "../controllers/cart/update-product-in-cart-controller.js";
import deleteCartProduct from "../controllers/cart/delete-product-from-cart-contoller.js";
import verifyToken from "../middlewares/verifyToken-middleware.js";
import getUserRole from "../middlewares/getUserRole-middleware.js";
import checkCustomer from "../middlewares/checkCustomer-middleware.js";

const router = express.Router();

//add product in cart
router.route('/add').post(verifyToken, getUserRole, checkCustomer, addProductInCart);
//update product in cart
router.route('/update').patch(verifyToken, getUserRole, checkCustomer, updateProductInCart);
//delete product from cart
router.route('/delete').delete(verifyToken, getUserRole, checkCustomer, deleteCartProduct);
//get cart item of particular user
router.route('').get(verifyToken, getUserRole, checkCustomer, productsOfCartOfParticularUser);

export default router;