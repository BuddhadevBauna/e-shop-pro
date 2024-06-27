//for get currently login user data
const user = async (req, res) => {
    try {
        const userData = req.userData;
        // console.log(userData);
        return res
            .status(200)
            .json({ userData })
    } catch (error) {
        console.log(`error from user route ${error}`);
    }
}

export default user;