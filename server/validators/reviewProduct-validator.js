import { z } from "zod";

const creatingStringSchema = (fieldName, min, max) => {
    return (
        z.string({ required_error: `${fieldName} is required.`, invalid_type_error: `${fieldName} must be string.` })
            .min(min, { message: `${fieldName} must be at least ${min} characters` })
            .max(max, { message: `${fieldName} must not exceed ${max} charaecters` })
    )
}

export const reviewSchema = z.object({
    product: z.string()
        .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), { message: "Invalid product ID format." }),
    reviewOwner: z.string()
        .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), { message: "Invalid review owner ID format." }),
    rating: z.number({ required_error: "Rating is required." })
        .min(1, { message: "Rating cannot be less than 1." })
        .max(5, { message: "Rating must not exceed 5." }),
    reviewHeading: creatingStringSchema("Review Heading", 3, 100),
    reviewDescription: creatingStringSchema("Review Description", 10, 500),
});