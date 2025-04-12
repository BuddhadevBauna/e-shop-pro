import { z } from "zod";
import { numberSchema, objectIdSchema, stringSchema } from "../validatorSchema.js";

export const ratingSchema = z.object({
    product: objectIdSchema("Product ID", true),
    reviewOwner: objectIdSchema("Review Owner ID", true),
    rating: numberSchema("Rating", 1, 5, true)
});