import User from "../models/user-model.js";

const validatePassword = async (req, res, next) => {
    try {
        const {password} = req.body;
        // console.log(password);
        if(!password) {
            const error = {
                status: 400,
                message: "Password is required for deletion"
            }
            next(error);
        }

        const email = req.verifiedUserData.email;
        const user = await User.findOne({email});
        if(!user) {
            const error = {
                status: 400,
                message: "User not found"
            }
            next(error);
        }

        const isPasswordMatch = await user.comparePassword(password);
        // console.log(isPasswordMatch);
        if(!isPasswordMatch) {
            const error = {
                status: 400,
                message: "Invalid password"
            }
            next(error);
        }

        next();
    } catch (err) {
        // console.error(error);
        const error = {
            status: 400,
            message: "Server error during password validation"
        }
        next(error);
    }
}

export default validatePassword;