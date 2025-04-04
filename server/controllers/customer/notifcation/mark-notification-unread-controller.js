import Notification from "../../../models/notification/notification-model.js";

const markNotificationAsUnread = async (req, res) => {
    try {
        const {userId, notificationId} = req.body;
        // console.log(userId, notificationId);

        if(!userId || !notificationId) {
            return res.status(400).json({message: "Missing Required field."});
        }

        const updatedNotification = await Notification.updateOne(
            { _id: notificationId, userId },
            {
                $set: {
                    isRead: false,
                    readAt: null,
                    expiresAt: null
                }
            },
            { new: true }
        );

        if (updatedNotification.modifiedCount > 0) {
            return res.status(200).json({ message: `Notification marked as unread.` });
        } else {
            return res.status(400).json({message: "Notification marked unread unsuccessful."})
        }
    } catch (error) {
        console.error("Server Error.");
    }
}

export default markNotificationAsUnread;