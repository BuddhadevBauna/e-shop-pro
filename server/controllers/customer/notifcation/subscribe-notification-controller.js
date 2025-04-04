import Cart from "../../../models/cart/cart-model.js";
import Subscription from "../../../models/notification/subscriptions-model.js";
import Product from "../../../models/product-model.js";
import User from "../../../models/user-model.js";

const models = {
    Product: Product,
    Cart: Cart,
    // Wishlist: Wishlist,
    // Order: Order,
};

const subScribeNotification = async (req, res) => {
    try {
        const { userId } = req.params;
        const { type, typeId, reason } = req.body;

        if (!userId || !type || !typeId || !reason) return res.status(400).json({ message: "Missing required fields." });

        const user = await User.findOne({ _id: userId });
        if (!user) return res.status(400).json({ message: "User not find." });

        const model = models[type];
        if (!model) {
            return res.status(400).json({ message: `${type} is not a valid type.` });
        }

        const item = await Product.findOne({ _id: typeId });
        if (!item) return res.status(400).json({ message: `${type} not found.` });

        if (!["product is out of stock", "product is unavailable", "order update", "wishlist update", "cart reminder"].includes(reason)) {
            return res.status(400).json({ message: "Invalid reason." });
        }

        if(type === "Product") {
            if((item.isDeleted && reason === "product is unavailable")  || (item.stock === 0 && reason === "product is out of stock")) {
                let existingSubscription = await Subscription.findOne({type, typeId, reason});
                if(!existingSubscription) {
                    const newSubscription = new Subscription({type, typeId, reason, users: [{ userId }]});
                    await newSubscription.save();
                } else {
                    const updateSubscription = await Subscription.findOneAndUpdate(
                        {type, typeId, reason, "users.userId": {$ne: userId}},
                        {$push: {users: {userId}}},
                        {new: true}
                    );
                    // console.log(updateSubscription);
                    if(!updateSubscription) {
                        return res.status(400).json({message: `You already subscribed for notification.`})
                    }
                }
                return res.status(200).json({message: `You will be notified when ${type} ${!item.isDeleted ? "become in stock" : "is available"}.`})
            }
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Server error." });
    }
}

export default subScribeNotification;