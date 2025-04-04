import Notification from "../../../models/notification/notification-model.js";

const markNotificationAsRead = async (req, res) => {
    try {
        const { userId, notificationId } = req.body;
        // console.log(userId, notificationId);

        if(!userId || !notificationId) {
            return res.status(400).json({message: "Missing Required field."});
        }
        
        const updatedNotification = await Notification.updateOne(
            { _id: notificationId, userId },
            {
                $set: {
                    isRead: true,
                    readAt: new Date(),
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
                }
            },
            { new: true }
        );

        if (updatedNotification.modifiedCount > 0) {
            return res.status(200).json({ message: `Notification marked as read. It will expire in 1 days.` });
        } else {
            return res.status(400).json({message: "Notification marked as read unsuccessful."})
        }
    } catch (error) {
        console.error("Server Error.");
    }
}

export default markNotificationAsRead;