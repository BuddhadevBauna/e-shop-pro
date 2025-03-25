import jwt from "jsonwebtoken";

const verifyOptionalToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        // console.log(token);
        if(!token) {
            req.isAdmin = false;
            return next();
        }
        const jwtToken = token.replace("Bearer ", "");
        const verifiedUserData = jwt.verify(jwtToken, process.env.JWT_KEY);
        // console.log(verifiedUserData);
        req.isAdmin = verifiedUserData?.role?.includes('admin');
        return next();
    } catch (error) {
        // console.log(error);
        req.isAdmin = false;
        return next();
    }
}

export default verifyOptionalToken;