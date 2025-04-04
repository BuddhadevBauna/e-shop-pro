import mongoose from "mongoose";
import Address from "../../../models/address-model.js";

const editAddress = async (req, res) => {
    try {
        const { addressId, userId } = req.query;
        const addressObjectId = new mongoose.Types.ObjectId(addressId);
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const addressData = req.body;

        await Address.findByIdAndUpdate(
            { _id: addressObjectId, user: userObjectId },
            addressData,
            { new: true }
        )
        return res.status(200).json({message: "Edit address successful."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Edit address unsuccessful."})
    }
}

export default editAddress;