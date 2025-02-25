import { z } from "zod";

const signinSchema = z.object({
    email: z.string({ required_error: "Email is required.", invalid_type_error: "Email must be a string." })
        .email({ message: "Invalid email address." })
        .max(255, { message: "Email must not exceed 255 characters." }),

    password: z.string({ required_error: "Password is required.", invalid_type_error: "Password must be a string." })
        .min(4, { message: "Password must be at least 4 characters." })
        .max(255, { message: "Password must not exceed 255 characters." })
});

const signupSchema = signinSchema.extend({
    name: z.string({ required_error: "Name is required.", invalid_type_error: "Name must be a string." })
        .min(3, { message: "Name must be at least 3 characters." })
        .max(255, { message: "Name must not exceed 255 characters." }),

    phone: z.string({ required_error: "Phone is required." })
        .regex(/^\d{10}$/, { message: "Phone must be a valid 10-digit number." }) 
});

const userValidationSchema = signupSchema;
const userUpdateSchema = userValidationSchema.partial();

export { signinSchema, signupSchema, userValidationSchema, userUpdateSchema };