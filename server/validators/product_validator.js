import { z } from "zod";

const creatingStringSchema = (fieldName, min, max) => {
    return (
        z.string({ required_error: `${fieldName} is required.`, invalid_type_error: `${fieldName} must be string.` })
            .min(min, { message: `${fieldName} must be at least ${min} characters` })
            .max(max, { message: `${fieldName} must not exceed ${max} charaecters` })
    )
}

export const productSchema = z.object({
    title: creatingStringSchema("Title", 3, 100),
    description: creatingStringSchema("Description", 10, 500),
    category: creatingStringSchema("Category", 3, 20),
    // category: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid category ID format." }),
    mrp: z.number({ required_error: "Price is required." }).min(0, { message: "Price must be a positive number." }),
    discountPercentage: z.number({ required_error: "Discount Percentage is required." })
        .min(0, { message: "Discount cannot be negative." })
        .max(100, { message: "Discount cannot exceed 100%." }),
    rating: z.number()
        .min(1, { message: "Rating cannot be less than 1." })
        .max(5, { message: "Rating must not exceed 5." })
        .optional(),
    stock: z.number({ required_error: "Stock is required." }).min(0, { message: "Stock cannot be negative." }),
    brand: z.string().optional(),
    warrantyInformation: creatingStringSchema("Warranty Information", 3, 100),
    shippingInformation: creatingStringSchema("Shipping Information", 3, 100),
    returnPolicy: creatingStringSchema("Return Policy", 3, 200),
    images: z.array(z.string().url({ message: "Each image must be a valid URL." })).nonempty({ message: "At least one image is required." }),
    thumbnail: z.string({ required_error: "Thumbnail is required." }).url({ message: "Thumbnail must be a valid URL." }),
    reviews: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid review ID format." })).optional(),
});

export const updatedProductSchema = productSchema.partial();