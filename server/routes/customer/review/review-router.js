import express from "express";
import verifyToken from "../../../middlewares/verifyToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import validate from "../../../middlewares/validateUserProvidedData-middleware.js";
import { reviewSchema } from "../../../validators/reviewProduct-validator.js";
import addReview from "../../../controllers/customer/review/add-review-controller.js";
import reviewProducts from "../../../controllers/customer/review/get-reviews-controller.js";

const router = express.Router();

router.route('/add').post(verifyToken, getUserRole, checkCustomer, validate(reviewSchema), addReview);
router.route('/:userId').get(verifyToken, getUserRole, checkCustomer, reviewProducts);

export default router;