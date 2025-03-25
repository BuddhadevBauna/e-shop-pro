import express from "express";
import verifyReqiredToken from "../../../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import validate from "../../../middlewares/validateUserProvidedData-middleware.js";
import { reviewSchema } from "../../../validators/reviewProduct-validator.js";
import addReview from "../../../controllers/customer/review/add-review-controller.js";
import reviewProducts from "../../../controllers/customer/review/get-reviews-controller.js";

const router = express.Router();

router.route('/add').post(verifyReqiredToken, getUserRole, checkCustomer, validate(reviewSchema), addReview);
router.route('/:userId').get(verifyReqiredToken, getUserRole, checkCustomer, reviewProducts);

export default router;