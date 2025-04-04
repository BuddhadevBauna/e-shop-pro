import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    type: { type: String, enum: ["Product", "Order", "Wishlist", "Cart"], required: true },
    typeId: { type: mongoose.Schema.Types.ObjectId, refPath: "type", required: true },
    reason: {
        type: String,
        enum: ["product is out of stock", "product is unavailable", "order update", "wishlist update", "cart reminder"],
        required: true
    },
    users: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        subscribedAt: { type: Date, default: Date.now }
    }]
});

SubscriptionSchema.index({ type: 1, typeId: 1, reason: 1 });
SubscriptionSchema.index({ type: 1, typeId: 1, reason: 1, "users.userId": 1 }, { unique: true });

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
export default Subscription;