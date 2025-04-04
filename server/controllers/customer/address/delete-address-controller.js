import mongoose from "mongoose";
import Address from "../../../models/address-model.js";
import User from "../../../models/user-model.js";

const deleteAddress = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { userId, addressId } = req.query;

        const addressObjectId = new mongoose.Types.ObjectId(addressId);
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const addressToDelete = await Address.findOne({ _id: addressObjectId, user: userObjectId }).session(session);

        if (!addressToDelete) {
            session.endSession();
            return res.status(404).json({ message: "Address not found." });
        }

        await Address.deleteOne({ _id: addressObjectId, user: userObjectId }, { session });

        if (addressToDelete?.isDefault) {
            await Address.findOneAndUpdate(
                { user: userObjectId },
                { $set: { isDefault: true } },
                { sort: { updatedAt: -1 }, session }
            );
        }

        await User.findByIdAndUpdate(
            { _id: userObjectId },
            { $pull: { addresses: addressId } },
            { new: true, session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: "Address deletion successful." });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "Address deletion unsuccessful." });
    }
}

export default deleteAddress;