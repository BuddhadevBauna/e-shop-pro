import mongoose from "mongoose";
import { z } from "zod";

export const objectIdSchema = (fieldName, required) => {
    let schema = z
        .string({ required_error: `${fieldName} is required.` })
        .refine((val) => mongoose.Types.ObjectId.isValid(val), { message: `Invalid ${fieldName} format` });

    return required ? schema : schema.optional();
}

export const stringSchema = (fieldName, min, max, required) => {
    let schema = z
        .string({ required_error: `${fieldName} is required.`, invalid_type_error: `${fieldName} must be string.` })
        .min(min, { message: `${fieldName} must be at least ${min} characters` })
        .max(max, { message: `${fieldName} must not exceed ${max} charaecters` })

    return required ? schema : schema.optional();
}

export const numberSchema = (fieldName, min, max, required) => {
    let schema = z
        .number({ required_error: `${fieldName} is required.` })
        .min(min, { message: `${fieldName} must be at least ${min}.` })
        .max(max, { message: `${fieldName} must not exceed ${max}.` });

    return required ? schema : schema.optional();
};