import express from "express";
import verifyToken from "../../../middlewares/verifyToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import addProductInCart from "../../../controllers/customer/cart/add-product-in-cart-controller.js";
import updateProductInCart from "../../../controllers/customer/cart/update-product-in-cart-controller.js";
import productsOfCartOfParticularUser from "../../../controllers/customer/cart/get-products-of-cart-of-particular-user-controler.js";
import deleteCartProduct from "../../../controllers/customer/cart/delete-product-from-cart-contoller.js";
import validate from "../../../middlewares/validateUserProvidedData-middleware.js";
import { addToCartSchema, mergeGuestCartSchema, updateCartQunatitySchema } from "../../../validators/cart-validator.js";
import mergeGuestCart from "../../../controllers/customer/cart/merge-product-of-guest-cart-controller.js";

const router = express.Router();

router.route('/add').post(verifyToken, getUserRole, checkCustomer, validate(addToCartSchema), addProductInCart);
router.route('/merge').post(verifyToken, getUserRole, checkCustomer, validate(mergeGuestCartSchema), mergeGuestCart);
router.route('/update').patch(verifyToken, getUserRole, checkCustomer, validate(updateCartQunatitySchema), updateProductInCart);
router.route('/delete').delete(verifyToken, getUserRole, checkCustomer, deleteCartProduct);
router.route('').get(verifyToken, getUserRole, checkCustomer, productsOfCartOfParticularUser);

export default router;