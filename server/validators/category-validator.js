import { z } from "zod";

const creatingStringSchema = (feildName) => {
    return (
        z.string({ required_error: `${feildName} is required.`, invalid_type_error: `${feildName} must be string.` })
            .min(3, { message: `${feildName} must be at least 3 characters` })
            .max(20, { message: `${feildName} must not exceed 20 charecter` })
    )
}

const subCategorySchema = z.object({
    name: creatingStringSchema("SubCategory Name"),
    categoryType: creatingStringSchema("SubCategory type")
});

const baseCategorySchema = z.object({
    name: creatingStringSchema("Category name"),
    categoryType: creatingStringSchema("Category type")
});

const fullCategorySchema = baseCategorySchema.extend({
    subCategory: z.array(subCategorySchema)
});

export { baseCategorySchema, subCategorySchema, fullCategorySchema };