import mongoose from "mongoose";
import calculateOrderPrice from "./orderPriceCalculation.js";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            productSnapshot: {
                thumbnail: { type: String, required: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
                mrp: { type: Number, required: true },
                discountPercentage: { type: Number, required: true },
            },
            totalMRP: { type: Number, default: 0 },
            totalDiscount: { type: Number, default: 0 },
            totalSalePrice: { type: Number, default: 0 }
        }
    ],
    orderFinalMRP: { type: Number, default: 0 },
    orderFinalDiscount: { type: Number, default: 0 },
    orderFinalPrice: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'expired'],
        default: 'pending'
    },
    reservedUntil: {
        type: Date,
        required: true,
        index: true
    },
    confirmedAt: {
        type: Date,
        required: function () {
            return this.status === 'confirmed';
        }
    }
},{timestamps: true});

orderSchema.pre("save", async function (next) {
    try {
        // console.log(this);
        const result = await calculateOrderPrice(this);
        // console.log(result);
        this.products = result.products;
        this.orderFinalMRP = result.orderFinalMRP;
        this.orderFinalDiscount = result.orderFinalDiscount;
        this.orderFinalPrice = result.orderFinalPrice;
        next();
    } catch (error) {
        next({
            status: 400,
            message: "Failed to calculate order price"
        });
    }
});

const Order = mongoose.models.Order || new mongoose.model('Order', orderSchema);
export default Order;