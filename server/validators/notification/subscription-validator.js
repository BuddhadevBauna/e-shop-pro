import { z } from "zod";
import { objectIdSchema } from "../validatorSchema.js";

export const subscribedNotificationSchema = z.object({
    userId: objectIdSchema("User ID", true),
    type: z.enum(["Product", "Order", "Wishlist", "Cart"]).refine(
        (val) => ["Product", "Order", "Wishlist", "Cart"].includes(val),
        { message: "Type must be one of 'Product', 'Order', 'Wishlist', or 'Cart'." }
    ),
    typeId: objectIdSchema("Type ID", true),
    reason: z.enum(["product is out of stock", "product is unavailable", "order update", "wishlist update", "cart reminder"]).refine(
        (val) => ["product is out of stock", "product is unavailable", "order update", "wishlist update", "cart reminder"].includes(val),
        { message: "Reason must be one of 'product is out of stock', 'product is unavailable', 'order update', 'wishlist update', or 'cart reminder'." }
    )
}).partial();