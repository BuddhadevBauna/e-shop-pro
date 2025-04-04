import mongoose from "mongoose";
import calculateCartPrice from "./cart-calculation.js";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: { type: Number, required: true, min: 1 },
            totalMRP: { type: Number, default: 0 },
            totalDiscount: { type: Number, default: 0 },
            totalSalePrice: { type: Number, default: 0 }
        }
    ],
    cartFinalMRP: { type: Number, default: 0 },
    cartFinalDiscount: { type: Number, default: 0 },
    cartFinalPrice: { type: Number, default: 0 }
}, { timestamps: true });

cartSchema.pre("save", async function (next) {
    const result = await calculateCartPrice(this);
    // console.log(result);
    this.items = result.items;
    this.cartFinalMRP = result.cartFinalMRP;
    this.cartFinalDiscount = result.cartFinalDiscount;
    this.cartFinalPrice = result.cartFinalPrice;
    next();
});
cartSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    const filter = this.getFilter();
    // console.log(update);
    // console.log(filter);
    if (filter['user']) {
        const items = { user: filter['user'] };
        if (update?.$push?.['items']) {
            const newItem = update.$push['items'];
            items.items = [newItem];
            // console.log(newItem, items);
            const result = await calculateCartPrice(items);
            // console.log(result);
            update.$push['items'] = result.items;
            this.set({
                cartFinalMRP: result.cartFinalMRP,
                cartFinalDiscount: result.cartFinalDiscount,
                cartFinalPrice: result.cartFinalPrice
            });
        } else if (filter?.['items.product'] && update?.$set?.['items.$.quantity']) {
            items.items = [
                {
                    product: filter['items.product'],
                    quantity: update.$set['items.$.quantity']
                }
            ]
            // console.log(items);
            const result = await calculateCartPrice(items);
            // console.log(result);
            this.set({
                'items.$.totalMRP': result.items[0].totalMRP,
                'items.$.totalDiscount': result.items[0].totalDiscount,
                'items.$.totalSalePrice': result.items[0].totalSalePrice,
                cartFinalMRP: result.cartFinalMRP,
                cartFinalDiscount: result.cartFinalDiscount,
                cartFinalPrice: result.cartFinalPrice
            });
        }
    }
    next();
});
cartSchema.pre("updateOne", async function (next) {
    const update = this.getUpdate();
    const filter = this.getFilter();
    if (filter['user']) {
        const items = { user: filter['user'] };
        if (update?.$pull?.['items']) {
            const itemToBedeleted = update.$pull['items'];
            items.items = [itemToBedeleted];
            items.isItemToBeDelete = true;
            const result = await calculateCartPrice(items);
            this.set({
                cartFinalMRP: result.cartFinalMRP,
                cartFinalDiscount: result.cartFinalDiscount,
                cartFinalPrice: result.cartFinalPrice
            });
        } else if (update?.$push?.['items']?.$each) {
            items.items = update.$push['items'].$each;
            // console.log(items);
            const result = await calculateCartPrice(items);
            // console.log(result);
            update.$push['items'].$each = result.items;
            this.set({
                cartFinalMRP: result.cartFinalMRP,
                cartFinalDiscount: result.cartFinalDiscount,
                cartFinalPrice: result.cartFinalPrice
            });
        }
    }
    next();
});

import "./cart-watchers.js";

const Cart = new mongoose.model("Cart", cartSchema);
export default Cart;