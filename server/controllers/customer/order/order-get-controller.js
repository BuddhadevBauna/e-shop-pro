import Order from "../../../models/order/order-model.js";

export const getLatestOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        // console.log(userId);
        const order = await Order.findOne({ userId }).sort({ createdAt: -1 });
        res.status(200).json({order});
    } catch (error) {
        // console.error("Error fetching latest order:", error);
        res.status(500).json({ message: "Failed to fetch order." });
    }
};