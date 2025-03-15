import { z } from "zod";
import { stringSchema } from "./validatorSchema.js";

const signinSchema = z.object({
    email: z.string({ required_error: "Email is required.", invalid_type_error: "Email must be a string." })
        .email({ message: "Invalid email address." })
        .max(255, { message: "Email must not exceed 255 characters." }),
    password: stringSchema("Password", 4, 255, true)
});

const signupSchema = signinSchema.extend({
    name: stringSchema("Name", 4, 255, true),
    phone: z.string({ required_error: "Phone is required." })
        .regex(/^\d{10}$/, { message: "Phone must be a valid 10-digit number." }) 
});

const userValidationSchema = signupSchema;
const userUpdateSchema = userValidationSchema.partial();

export { signinSchema, signupSchema, userValidationSchema, userUpdateSchema };