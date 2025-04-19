import { z } from "zod";
import { numberSchema, objectIdSchema, stringSchema } from "./validatorSchema.js";

export const orderSchema = z.object({
    userId: objectIdSchema("User Id", true),
    products: z.array(
        z.object({
            productId: objectIdSchema("Product Id", true),
            quantity: z
                .number({ required_error: `Quantity is required.` })
                .min(1, { message: `Quantity must be at least 1.` }),
            productSnapshot: z.object({
                thumbnail: z
                    .string({ required_error: "Thumbnail is required." })
                    .url({ message: "Thumbnail must be a valid URL." }),
                title: stringSchema("Title", 3, 100, true),
                description: stringSchema("Description", 10, 500, true),
                mrp: numberSchema("MRP", 0, Number.MAX_SAFE_INTEGER, true),
                discountPercentage: numberSchema("Discount Percentage", 0, 100, true),
            }),
        })
    )
});