import User from "../../models/user-model.js";

const register = async (req, res) => {
    try {
        //get the registration data
        const { username, email, phone, password } = req.body;

        //check the email is exist or not
        const userExist = await User.findOne({ email });
        // console.log(userExist);
        if (userExist) {
            return res.status(400).json({ message: "email already exist." });
        }

        const userCreated = await User.create({ username, email, phone, password });
        // console.log(userCreated);
        return res.status(201)
            .json({
                msg: "registration successful",
            });
    } catch (error) {
        return res.status(500)
            .send({ msg: "Internal Server error" });
    }
}

export default register;