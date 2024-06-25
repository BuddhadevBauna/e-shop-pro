const adminMiddleware = (req, res, next) => {
    try {
        // console.log(req.userData);
        const isAdmin = req.userData.isAdmin;
        // console.log(isAdmin);
        if(!isAdmin) {
            const status = 403;
            const message = "Access denied user not admin";
            const error = {
                status,
                message
            };
            next(error);
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default adminMiddleware;