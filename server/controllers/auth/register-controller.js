import User from "../../models/user-model.js";

const register = async (req, res) => {
    try {
        let { name, email, phone, password } = req.body;
        // console.log(name, email, password);

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "Please fill all feilds." });
        }

        email = email.trim();
        phone = phone.trim();

        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        // console.log(userExists);

        if (userExists) {
            return res.status(400).json({ message: "User already exists." });
        } else {
            const userCreate = await User.create({ name, email, phone, password });
            return res.status(201).json({message: "Registration successful"});
        }
    } catch (error) {
        // console.log("Registration unsuccessful", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default register;