import express from "express";
import verifyReqiredToken from "../../../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import ratingAndReviewProducts from "../../../controllers/customer/rating-and-review/get-rating-and-reviews-controller.js";

const router = express.Router();

router.route('/').get(verifyReqiredToken, getUserRole, checkCustomer, ratingAndReviewProducts);

export default router;