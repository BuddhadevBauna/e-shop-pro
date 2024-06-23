import express from "express";
import register from "../controllers/auth/register-controller.js";
import login from "../controllers/auth/login-controller.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);

export default router;