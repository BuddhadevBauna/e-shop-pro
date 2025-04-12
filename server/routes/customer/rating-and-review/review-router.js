import express from "express";
import verifyReqiredToken from "../../../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import validate from "../../../middlewares/validateUserProvidedData-middleware.js";
import { reviewSchema } from "../../../validators/rating-and-review/review-validator.js";
import addReview from "../../../controllers/customer/rating-and-review/add-review-controller.js";

const router = express.Router();

router.route('/add').post(verifyReqiredToken, getUserRole, checkCustomer, validate(reviewSchema), addReview);

export default router;