import { z } from "zod";
import { objectIdSchema } from "./validatorSchema.js";

export const addToCartSchema = z.object({
    user: objectIdSchema("User Id", true),
    product: objectIdSchema("Product Id", true),
    quantity: z
        .number({ required_error: `Quantity is required.` })
        .min(1, { message: `Quantity must be at least 1.` })
});

export const mergeGuestCartSchema = z.object({
    user: objectIdSchema("User Id", true),
    guestCart: z.array(
        z.object({
            product: objectIdSchema("Product Id", true),
            quantity: z
                .number({ required_error: `Quantity is required.` })
                .min(1, { message: `Quantity must be at least 1.` })
        })
    )
});


export const updateCartQunatitySchema = z.object({
    quantity: z
        .number({ required_error: `Quantity is required.` })
        .min(1, { message: `Quantity must be at least 1.` })
});