import { z } from "zod";

const creatingStringSchema = (feildName) => {
    return (
        z.string({ required_error: `${feildName} is required.`, invalid_type_error: `${feildName} must be string.` })
            .min(3, { message: `${feildName} must be at least 3 characters` })
            .max(20, { message: `${feildName} must not exceed 20 charecter` })
    )
}

const categorySchema = z.object({
    name: creatingStringSchema("Category Name"),
    categoryType: creatingStringSchema("Category type"),
    parent: z.string().optional().nullable()
});

const fullCategorySchema = categorySchema.extend({
    subCategory: z.array(categorySchema).optional()
})

export default fullCategorySchema;