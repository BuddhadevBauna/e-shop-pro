import { z } from "zod";
import { objectIdSchema, stringSchema } from "../validatorSchema.js";
import mongoose from "mongoose";

export const notificationSchema = z.object({
  userId: z.custom((val) => val instanceof mongoose.Types.ObjectId, {
    message: "userId must be a valid MongoDB ObjectId.",
  }),
  type: z.enum(["Product", "Order", "Wishlist", "Cart"]).refine(
    (val) => ["Product", "Order", "Wishlist", "Cart"].includes(val),
    { message: "Type must be one of 'Product', 'Order', 'Wishlist', or 'Cart'." }
  ),
  typeId: z.custom((val) => val instanceof mongoose.Types.ObjectId, {
    message: "typeId must be a valid MongoDB ObjectId.",
  }),
  message: stringSchema("Message", 4, 255, true),
  isRead: z.boolean().optional(),
  readAt: z.union([z.date(), z.null()]).optional(),
  expiresAt: z.union([z.date(), z.null()]).optional()
}).partial();