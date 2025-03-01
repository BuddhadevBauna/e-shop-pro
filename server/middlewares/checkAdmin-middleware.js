const checkAdmin = (req, res, next) => {
    try {
        if(req.userRole.includes("admin")) {
            next();
        } else { 
            const error = {
                status: 403,
                message: "Access denied, user not admin"
            }
            next(error);
        }
    } catch (e) {
        const error = {
            status: 500,
            message: "Server issue"
        }
        next(error);
    }
}

export default checkAdmin;