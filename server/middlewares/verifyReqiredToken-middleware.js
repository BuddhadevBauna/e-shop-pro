import jwt from "jsonwebtoken";

const verifyReqiredToken = (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        // console.log(token);
        if(!token) {
            const status = 401;
            const message = "Unauthorized HTTP, token not provided";
            next({status, message});
        }
        const verifiedUserData = jwt.verify(token, process.env.JWT_KEY);
        req.verifiedUserData = verifiedUserData;
        next();
    } catch (e) { 
        const status = 401;
        const message = "Unauthorized, invalid token";
        next({status, message});
    }
}

export default verifyReqiredToken;