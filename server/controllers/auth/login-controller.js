import User from "../../models/user-model.js";
import crypto from "crypto";

const generateToken = () => {
    return crypto.randomBytes(20).toString("hex");
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        email = email.trim();

        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ message: "Invalid credentials." });
        } else {
            const isPasswordMatch = await userExists.comparePassword(password);
            // console.log(isPasswordMatch);
            if (isPasswordMatch) {
                if(userExists.isVerified) {
                    const jwtToken = userExists.generateToken();
                    return res.cookie('jwtToken', jwtToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production', // send over HTTPS only in production
                        sameSite: 'Strict', // or 'Lax' depending on your needs
                        maxAge: 60 * 60 * 1000, // 1 hour
                    }).status(200).json({message: "Login successful"});
                } else {
                    return res.status(200).json({
                        message: "Login successful, but verification required.",
                        data: {
                            email: userExists.email,
                            phone: userExists.phone,
                            token: generateToken()
                        },
                    });
                }
                
            } else {
                return res.status(400).json({ message: "Invalid credentials." });
            }
        }
    } catch (error) {
        // console.log("Login unsuccessful", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default login;