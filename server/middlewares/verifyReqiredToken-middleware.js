import jwt from "jsonwebtoken";

const verifyReqiredToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        // console.log(token);
        if(!token) {
            const status = 401;
            const message = "Unauthorized HTTP, token not provided";
            next({status, message});
        }
        const jwtToken = token.replace("Bearer ", "");
        const verifiedUserData = jwt.verify(jwtToken, process.env.JWT_KEY);
        req.verifiedUserData = verifiedUserData;
        next();
    } catch (e) { 
        const status = 401;
        const message = "Unauthorized, invalid token";
        next({status, message});
    }
}

export default verifyReqiredToken;