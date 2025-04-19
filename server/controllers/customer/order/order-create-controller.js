import Order from "../../../models/order/order-model.js";

export const createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        // console.log(orderData);

        if (!orderData.userId || !Array.isArray(orderData.products) || orderData.products.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        const newOrder = new Order({
            userId: orderData.userId,
            products: orderData.products,
            reservedUntil: new Date(Date.now() + 60 * 60 * 1000), // 1hr hold
        });

        await newOrder.save();
        return res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};