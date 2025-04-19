import mongoose from "mongoose";
import User from "../../../models/user-model.js";

const getAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const addresses = await User.findById(userObjectId)
            .populate({ path: "addresses", options: { sort: { isDefault: -1, addressType: 1 } } })
            .select("addresses");
        // console.log(addresses.addresses);
        return res.status(200).json({ addresses: addresses.addresses });
    } catch (error) {
        return res.status(500).json({ message: "Address get unsuccesful." });
    }
}

const getRecentAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const addresses = await User.findById(userObjectId)
            .populate({ path: "addresses", options: { sort: { createdAt: -1 } } })
            .select("addresses");
        // console.log(addresses.addresses);
        return res.status(200).json({ addresses: addresses.addresses });
    } catch (error) {
        return res.status(500).json({ message: "Address get unsuccesful." });
    }
}

export {getAddress, getRecentAddress};