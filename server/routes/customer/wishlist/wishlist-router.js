import express from "express";
import verifyReqiredToken from "../../../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import { getWishListItemsWithPagination, getWishListItemsWithoutPagination } from "../../../controllers/customer/wishlist/get-wishlist-controller.js";
import validate from "../../../middlewares/validateUserProvidedData-middleware.js";
import { wishlistSchema } from "../../../validators/wishlist-validator.js";
import addWishList from "../../../controllers/customer/wishlist/add-wishlist-controller.js";
import deleteWishList from "../../../controllers/customer/wishlist/delete-wishlist-controller.js";

const router = express.Router();

router.route('/paginated').get(verifyReqiredToken, getUserRole, checkCustomer, getWishListItemsWithPagination);
router.route('/all').get(verifyReqiredToken, getUserRole, checkCustomer, getWishListItemsWithoutPagination);
router.route('/add').post(verifyReqiredToken, getUserRole, checkCustomer, validate(wishlistSchema), addWishList);
router.route('/delete').delete(verifyReqiredToken, getUserRole, checkCustomer, deleteWishList);

export default router;