import User from "../../models/user-model.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        // console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        if (userExist.password === password) {
            res.status(200)
                .json({
                    msg: "login successful",
                });
        } else {
            res.status(401)
                .json({ message: "Invalid email or password" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}

export default login;