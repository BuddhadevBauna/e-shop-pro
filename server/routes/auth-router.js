import express from "express";
import register from "../controllers/auth/register-controller.js";
import login from "../controllers/auth/login-controller.js";
import validate from "../middlewares/validate-middleware.js";
import { signinSchema, signupSchema } from "../validators/auth-validator.js";

const router = express.Router();

router.route('/register').post(validate(signupSchema), register);
router.route('/login').post(validate(signinSchema), login);

export default router;