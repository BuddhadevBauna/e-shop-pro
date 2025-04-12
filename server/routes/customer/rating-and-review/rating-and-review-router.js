import express from "express";
import verifyReqiredToken from "../../../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import getRatingAndReview from "../../../controllers/customer/rating-and-review/get-rating-and-review-controller.js";

const router = express.Router();

router.route('/').get(verifyReqiredToken, getUserRole, checkCustomer, getRatingAndReview);

export default router;