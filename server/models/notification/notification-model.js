import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type: { type: String, enum: ["Product", "Order", "Wishlist", "Cart"], required: true },
  typeId: { type: mongoose.Schema.Types.ObjectId, refPath: "type", default: null },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  readAt: { type: Date, default: null },
  expiresAt: { 
    type: Date, 
    default: null,
    index: {expires: 0}  // TTL index: auto-delete when expiresAt is reached
  }
}, {timestamps: true});

import "./notification-watcher.js";

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;