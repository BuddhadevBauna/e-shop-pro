import express from "express";
import verifyReqiredToken from "../../../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import validate from "../../../middlewares/validateUserProvidedData-middleware.js";
import { ratingSchema } from "../../../validators/rating-and-review/rating-validator.js";
import AddRating from "../../../controllers/customer/rating-and-review/add-or-update-rating-controller.js";

const router = express.Router();

router.route('/add').patch(verifyReqiredToken, getUserRole, checkCustomer, validate(ratingSchema), AddRating);

export default router;