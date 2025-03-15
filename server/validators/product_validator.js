import { z } from "zod";
import { numberSchema, objectIdSchema, stringSchema } from "./validatorSchema.js";

export const productSchema = z.object({
    title: stringSchema("Title", 3, 100, true),
    description: stringSchema("Description", 10, 500, true),
    category: stringSchema("Category", 3, 20, true),
    mrp: numberSchema("MRP", 0, Number.MAX_SAFE_INTEGER, true),
    discountPercentage: numberSchema("Discount Percentage", 0, 100, true),
    rating: numberSchema("Rating", 1, 5, false),
    stock: numberSchema("Stock", 0, Number.MAX_SAFE_INTEGER, true),
    brand: stringSchema("Brand", 2, 50, false),
    warrantyInformation: stringSchema("Warranty Information", 3, 100, true),
    shippingInformation: stringSchema("Shipping Information", 3, 100, true),
    returnPolicy: stringSchema("Return Policy", 3, 200, true),
    images: z
        .array(z.string().url({ message: "Each image must be a valid URL." }))
        .nonempty({ message: "At least one image is required." }),
    thumbnail: z
        .string({ required_error: "Thumbnail is required." })
        .url({ message: "Thumbnail must be a valid URL." }),
    reviews: z
        .array(objectIdSchema("Review ID", false))
        .optional(),
});

export const updatedProductSchema = productSchema.partial();