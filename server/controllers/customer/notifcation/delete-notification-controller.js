import Notification from "../../../models/notification/notification-model.js";

const deleteNotification = async (req, res) => {
    try {
        const { userId, notificationId } = req.body;

        if(!userId || !notificationId) {
            return res.status(400).json({message: "Missung Required field."});
        }

        const deletedNotification = await Notification.deleteOne({ _id: notificationId, userId });

        if (deletedNotification.deletedCount > 0) {
            return res.status(200).json({ message: "Delete notification successful." });
        } else {
            return res.status(400).json({message: "Delete Notification unsuccesful." })
        }
    } catch (error) {
        console.error("Server Error.");
    }
}

export default deleteNotification;