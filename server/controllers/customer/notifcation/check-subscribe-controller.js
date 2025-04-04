import Subscription from "../../../models/notification/subscriptions-model.js";

const checkSubscription = async (req, res) => {
    try {
        const { userId, type, typeId, reason } = req.query;

        if (!userId || !type || !typeId || !reason) return res.status(400).json({ message: "Missing required fields." });

        const subscription = await Subscription.findOne({ type, typeId, reason, "users.userId": userId });
        const isSubscribed = !!subscription;

        return res.status(200).json({ isSubscribed });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Server error." });
    }
}

export default checkSubscription;