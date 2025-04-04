import express from "express";
import verifyReqiredToken from "../../../middlewares/verifyReqiredToken-middleware.js";
import getUserRole from "../../../middlewares/getUserRole-middleware.js";
import checkCustomer from "../../../middlewares/checkCustomer-middleware.js";
import validate from "../../../middlewares/validateUserProvidedData-middleware.js";
import { subscribedNotificationSchema } from "../../../validators/notification/subscription-validator.js";
import checkSubscription from "../../../controllers/customer/notifcation/check-subscribe-controller.js";
import subScribeNotification from "../../../controllers/customer/notifcation/subscribe-notification-controller.js";
import unSubScribeNotification from "../../../controllers/customer/notifcation/unscribe-notification-controller.js";
import { getNotifications } from "../../../controllers/customer/notifcation/get-notification-controller.js";
import markNotificationAsRead from "../../../controllers/customer/notifcation/mark-notification-read-controller.js";
import markNotificationAsUnread from "../../../controllers/customer/notifcation/mark-notification-unread-controller.js";
import deleteNotification from "../../../controllers/customer/notifcation/delete-notification-controller.js";

const router = express.Router();

router.route('/subscribe/:userId').patch(verifyReqiredToken, getUserRole, checkCustomer, validate(subscribedNotificationSchema), subScribeNotification);
router.route('/unsubscribe/:userId').patch(verifyReqiredToken, getUserRole, checkCustomer, validate(subscribedNotificationSchema), unSubScribeNotification);
router.route('/subscribe/check').get(verifyReqiredToken, getUserRole, checkCustomer, checkSubscription );
router.route('/').get(verifyReqiredToken, getUserRole, checkCustomer, getNotifications);
router.route('/mark-as-read').patch(verifyReqiredToken, getUserRole, checkCustomer, markNotificationAsRead);
router.route('/mark-as-unread').patch(verifyReqiredToken, getUserRole, checkCustomer, markNotificationAsUnread);
router.route('/delete').delete(verifyReqiredToken, getUserRole, checkCustomer, deleteNotification);

export default router;