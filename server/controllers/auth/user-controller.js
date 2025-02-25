const user = (req, res) => {
    try {
        const userData = {
            id: req.verifiedUserData.id,
            name: req.verifiedUserData.name,
            email: req.verifiedUserData.email,
        }
        return res.status(200).json({
            userRole: req.verifiedUserData.role,
            extraUserData: userData
        });
    } catch (error) {
        console.log(error);
    }
}

export default user;