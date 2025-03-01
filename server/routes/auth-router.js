import express from "express";
import register from "../controllers/auth/register-controller.js";
import login from "../controllers/auth/login-controller.js";
import validate from "../middlewares/validateUserProvidedData-middleware.js";
import { signinSchema, signupSchema } from "../validators/auth-validator.js";
import { sendVerificationEmail, verifyEmail } from "../controllers/auth/verifyEmail-controller.js";
import { resetPassword, sendResetPasswordLink } from "../controllers/auth/resetPassword-controller.js";

const router = express.Router();

router.route('/register').post(validate(signupSchema), register);
router.route('/login').post(validate(signinSchema), login);

//verify email
router.route('/send-code').post(sendVerificationEmail);
router.route('/verify-email').post(verifyEmail);

//reset password
router.route('/send-link').post(sendResetPasswordLink);
router.route('/reset-password/:resetToken').post(resetPassword);

export default router;