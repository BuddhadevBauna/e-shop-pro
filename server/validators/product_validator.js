import { z } from "zod";

const creatingStringSchema = (feildName, min, max) => {
    return (
        z.string({ required_error: `${feildName} is required.`, invalid_type_error: `${feildName} must be string.` })
            .min(min, { message: `${feildName} must be at least ${min} characters` })
            .max(max, { message: `${feildName} must not exceed ${max} charecter` })
    )
}

export const productSchema = z.object({
    title: creatingStringSchema("Title", 3, 100),
    description: creatingStringSchema("Description", 10, 500),
    category: z.string({ required_error: "Category is required." }),
    price: z.number({ required_error: "Price is required." }).min(0, { message: "Price must be a positive number." }),
    discountPercentage: z.number({ required_error: "Discount Percentage is required." })
        .min(0, { message: "Discount cannot be negative." })
        .max(100, { message: "Discount cannot exceed 100%." }),
    rating: z.number({ required_error: "Rating is required." })
        .min(0, { message: "Rating cannot be negative." })
        .max(5, { message: "Rating must not exceed 5." }),
    stock: z.number({ required_error: "Stock is required." }).min(0, { message: "Stock cannot be negative." }),
    brand: z.string().optional(),
    warrantyInformation: creatingStringSchema("Warranty Information", 3, 100),
    shippingInformation: creatingStringSchema("Shipping Information", 3, 100),
    availabilityStatus: creatingStringSchema("Availability Status", 3, 50),
    returnPolicy: creatingStringSchema("Return Policy", 3, 200),
    images: z.array(z.string().url({ message: "Each image must be a valid URL." })).nonempty({ message: "At least one image is required." }),
    thumbnail: z.string({ required_error: "Thumbnail is required." }).url({ message: "Thumbnail must be a valid URL." }),
    reviews: z.array(
        z.object({
            rating: z.number({ required_error: "Rating is required." }).min(1).max(5),
            reviewHeading: creatingStringSchema("Review Heading", 3, 100),
            reviewDescription: creatingStringSchema("Review Description", 10, 500),
            reviewOwner: z.string({ required_error: "Review Owner is required." })
        })
    ).optional(),
});