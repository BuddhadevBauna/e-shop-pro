import jwt from "jsonwebtoken";

const verifyOptionalToken = (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        // console.log(token);
        if(!token) {
            req.isAdmin = false;
            return next();
        }
        const verifiedUserData = jwt.verify(token, process.env.JWT_KEY);
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