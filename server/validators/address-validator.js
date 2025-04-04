import { z } from "zod";
import { objectIdSchema, stringSchema } from "./validatorSchema.js";

export const addressSchema = z.object({
    user: objectIdSchema("User ID", true),
    fullName: stringSchema("Name", 4, 255, true),
    phone: z
        .string({ required_error: "Phone is required." })
        .regex(/^\d{10}$/, { message: "Phone must be a valid 10-digit number." }),
    pincode: z
        .string({ required_error: "Pincode is required." })
        .regex(/^\d{6}$/, { message: "Pincode must be a valid 6-digit number." }),
    locality: stringSchema("Locality", 4, 255, true),
    street: stringSchema("Street", 4, 500, true),
    city: stringSchema("City", 4, 255, true),
    state: stringSchema("State", 4, 255, true),
    addressType: stringSchema("Address type", 4, 255, true),
});

export const updateAddressSchema = addressSchema.partial();
