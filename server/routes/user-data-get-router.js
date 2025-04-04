import express from "express";
import verifyReqiredToken from "../middlewares/verifyReqiredToken-middleware.js";
import user from "../controllers/user/user-data-get-controller.js";

const router = express.Router();

router.route('/user').get(verifyReqiredToken, user);

export default router;