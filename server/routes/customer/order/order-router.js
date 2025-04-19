import express from "express";
import verifyReqiredToken from "../../../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import { createOrder } from "../../../controllers/customer/order/order-create-controller.js";
import validate from "../../../middlewares/validateUserProvidedData-middleware.js";
import { orderSchema } from "../../../validators/order-validator.js";
import { getLatestOrder } from "../../../controllers/customer/order/order-get-controller.js";

const router = express.Router();

router.route('/recent/:userId').get(verifyReqiredToken, getUserRole, checkCustomer, getLatestOrder);
router.route('/create').post(verifyReqiredToken, getUserRole, checkCustomer, validate(orderSchema), createOrder);

export default router;