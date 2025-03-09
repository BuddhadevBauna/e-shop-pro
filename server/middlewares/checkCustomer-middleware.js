const checkCustomer = (req, res, next) => {
    try {
        if(req.userRole.includes("customer")) {
            next();
        } else { 
            const error = {
                status: 403,
                message: "Access denied, user not customer"
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

export default checkCustomer;