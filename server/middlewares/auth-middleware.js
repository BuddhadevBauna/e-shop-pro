import jwt from "jsonwebtoken";
import User from "../models/user-model.js";


//for verify JWT
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        const status = 401;
        const message = "Unauthorized HTTP, token not provided";
        next({status, message});
    }
    // console.log("Token from auth middleware : ", token);

    //assuming token is in format "Bearer <JWTToken>, removing the "Bearer" prefix
    const jwtToken = token.replace("Bearer", "").trim();
    // console.log(jwtToken);

    try {
        const isVerified = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        // console.log(isVerified);

        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
        // console.log(userData);

        req.userId = userData._id,
        req.userData = userData,
        req.token = token

        next();
    } catch (error) {
        // console.log(error);
        const status = 401;
        const message = "Unauthorized, Invalid token";
        next({status, message});
    }

}

export default authMiddleware;