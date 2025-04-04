import mongoose from "mongoose";
import Notification from "../../models/notification/notification-model.js"
import Subscription from "../../models/notification/subscriptions-model.js";
import { notificationSchema } from "../../validators/notification/notification-validator.js";

export const handleStockAvailabilityNotification = async (productId) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) return;

    const subscription = await Subscription.findOne({ type: "Product", typeId: productId, reason: "product is out of stock" });
    if (!subscription || !subscription.users|| subscription.users.length === 0) return;

    let notifications = [];

    for (const user of subscription.users) {
        const notificationData = { 
            userId: user.userId,
            type: "Product",
            typeId: productId,
            message: "The product is back in stock!"
        };

        const validation = notificationSchema.safeParse(notificationData);
        if (!validation.success) {
            console.error(validation.error);
            continue;
        }

        notifications.push(notificationData);
    }
    if(notifications.length > 0) {
        await Notification.insertMany(notifications);
        await Subscription.deleteOne({ _id: subscription._id });
    }
}

export const handleProductAvailabilityNotification = async (productId) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) return;

    const subscription = await Subscription.findOne({ type: "Product", typeId: productId, reason: "product is unavailable" });
    if (!subscription || !subscription.users || subscription.users.length === 0) return;

    let notifications = [];

    for (const user of subscription.users) {
        const notificationData = { 
            userId: user.userId,
            type: "Product",
            typeId: productId,
            message: "The product is now available again!"
        };

        const validation = notificationSchema.safeParse(notificationData);
        if (!validation.success) {
            console.error(validation.error);
            continue;
        }

        notifications.push(notificationData);
    };
    if (notifications.length > 0) {
        await Notification.insertMany(notifications);
        await Subscription.deleteOne({ _id: subscription._id });
    }
}