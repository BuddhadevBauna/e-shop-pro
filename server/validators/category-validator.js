import { z } from "zod";
import { objectIdSchema, stringSchema } from "./validatorSchema.js";

const categorySchema = z.object({
    name: stringSchema("Category Name", 1, 255, true),
    categoryType: stringSchema("Category Type", 1, 255, true),
    parent: objectIdSchema("Parent Category", false).nullable()
});

const fullCategorySchema = categorySchema.extend({
    subCategory: z.array(categorySchema).optional()
})

export default fullCategorySchema;