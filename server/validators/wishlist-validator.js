import { z } from "zod";
import { objectIdSchema } from "./validatorSchema.js";

export const wishlistSchema = z.object({
    user: objectIdSchema("User Id", true),
    product: objectIdSchema("Product Id", true)
});