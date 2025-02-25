import express from "express";
import verifyToken from "../middlewares/verifyToken-middleware.js";
import user from "../controllers/auth/user-controller.js";

const router = express.Router();

router.route('/user').get(verifyToken, user);

export default router;