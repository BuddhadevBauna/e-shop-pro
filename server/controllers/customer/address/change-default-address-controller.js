import Address from "../../../models/address-model.js";

const changeDefaultAddress = async (req, res) => {
    try {
        const {userId, addressId} = req.query;

        if (!userId || !addressId) {
            return res.status(400).json({ message: "User ID and Address ID are required." });
        }

        await Address.updateMany(
            { user: userId, isDefault: true },
            { isDefault: false }
        );

        await Address.findByIdAndUpdate(
            { _id: addressId, user: userId },
            { isDefault: true },
            { new: true }
        )
        return res.status(200).json({message: "Address change successful."});
    } catch (error) {
        return res.status(200).json({message: "Address change unsuccessful."})
    }
}

export default changeDefaultAddress;