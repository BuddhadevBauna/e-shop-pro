import express from "express";
import verifyToken from "../../../middlewares/verifyToken-middleware.js";
import user from "../../../controllers/customer/details/user-data-get-controller.js";

const router = express.Router();

router.route('/user').get(verifyToken, user);

export default router;