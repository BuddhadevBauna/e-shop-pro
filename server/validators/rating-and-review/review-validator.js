import { z } from "zod";
import { numberSchema, objectIdSchema, stringSchema } from "../validatorSchema.js";

export const reviewSchema = z.object({
    product: objectIdSchema("Product ID", true),
    reviewOwner: objectIdSchema("Review Owner ID", true),
    reviewHeading: stringSchema("Review Heading", 3, 100, false),
    reviewDescription: stringSchema("Review Description", 10, 1000, true)
});