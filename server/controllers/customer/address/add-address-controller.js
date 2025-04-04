import mongoose from "mongoose";
import Address from "../../../models/address-model.js";
import User from "../../../models/user-model.js";

const addAddress = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const addressData = req.body;
        // console.log(addressData);

        const userId = addressData.user;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        await Address.updateMany(
            { user: userObjectId, isDefault: true },
            { isDefault: false },
            { session }
        );

        const newAddress = new Address({...addressData, isDefault: true});
        await newAddress.save({ session });

        await User.findByIdAndUpdate(
            { _id: userObjectId },
            { $push: { addresses: newAddress._id } },
            { new: true, session }
        );

        await session.commitTransaction();
        await session.endSession();

        return res.status(200).json({ message: "New address save successfully." });
    } catch (error) {
        // console.log(error);
        await session.abortTransaction();
        await session.endSession();
        return res.status(500).json({ message: "New address save unsuccessful." });
    }
}

export default addAddress;