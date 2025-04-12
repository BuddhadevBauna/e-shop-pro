import Notification from "../../../models/notification/notification-model.js";

export const getNotifications = async (req, res) => {
    try {
        const { userId, page, limit } = req.query;
        // console.log(userId, page, limit);
        const userNotifications = await Notification.find({ userId })
            .sort({ createdAt: - 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("typeId")
            .lean();
        // console.log(userNotifications);
        if (!userNotifications || userNotifications.length === 0) {
            return res.status(404).json({ message: "No notifications found." });
        }
        const totalCount = await Notification.countDocuments({ userId });
        // console.log(totalCount);
        return res.status(200).json({
            notifications: userNotifications,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
            hasMore: page * limit < totalCount
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error", error });
    }
};