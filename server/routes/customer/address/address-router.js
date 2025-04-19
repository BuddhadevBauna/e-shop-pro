import express from "express";
import verifyReqiredToken from "../../../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import validate from "../../../middlewares/validateUserProvidedData-middleware.js";
import { addressSchema, updateAddressSchema } from "../../../validators/address-validator.js";
import addAddress from "../../../controllers/customer/address/add-address-controller.js";
import {getAddress, getRecentAddress} from "../../../controllers/customer/address/get-address-controller.js";
import editAddress from "../../../controllers/customer/address/edit-address-controller.js";
import deleteAddress from "../../../controllers/customer/address/delete-address-controller.js";
import changeDefaultAddress from "../../../controllers/customer/address/change-default-address-controller.js";

const router = express.Router();

router.route('/:userId').get(verifyReqiredToken, getUserRole, checkCustomer, getAddress);
router.route('/recent/:userId').get(verifyReqiredToken, getUserRole, checkCustomer, getRecentAddress);
router.route('/add').post(verifyReqiredToken, getUserRole, checkCustomer, validate(addressSchema), addAddress);
router.route('/edit').patch(verifyReqiredToken, getUserRole, checkCustomer, validate(updateAddressSchema), editAddress);
router.route('/delete').delete(verifyReqiredToken, getUserRole, checkCustomer, deleteAddress);
router.route('/change-default').patch(verifyReqiredToken, getUserRole, checkCustomer, validate(updateAddressSchema), changeDefaultAddress);

export default router;