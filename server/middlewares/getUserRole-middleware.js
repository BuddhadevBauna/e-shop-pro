const getUserRole = (req, res, next) => {
    req.userRole = req.verifiedUserData.role
    next();
}

export default getUserRole;