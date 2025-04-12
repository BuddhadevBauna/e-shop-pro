const logoutUser = async (req, res) => {
    try {
        res.clearCookie("jwtToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });
        res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

export default logoutUser;