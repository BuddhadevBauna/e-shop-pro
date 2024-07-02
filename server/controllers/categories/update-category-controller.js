import Category from "../../models/category-model.js";

const categoryUpdate = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.query;
        // console.log(categoryId, subCategoryId);
        const updatedData = req.body;
        // console.log(updatedData);

        // Find the main category by id
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        // console.log(category);

        // Update main category name if present in the request body
        if (updatedData.categoryName) {
            category.name = updatedData.categoryName;
        }
        // Update main category type if present in the request body
        if (updatedData.categoryType) {
            category.categoryType = updatedData.categoryType;
        }

        // Update subcategory if subCategoryId is provided
        if (subCategoryId) {
            const subCategoryIndex = category.subCategory.findIndex(
                sub => sub._id.toString() === subCategoryId
            );
            // console.log(subCategoryIndex);

            if (subCategoryIndex !== -1) {
                // Update subcategory fields if they are present in the request body
                if (updatedData.subCategoryName) {
                    category.subCategory[subCategoryIndex].name = updatedData.subCategoryName;
                }
                if (updatedData.subCategoryType) {
                    category.subCategory[subCategoryIndex].categoryType = updatedData.subCategoryType;
                }
            } else {
                return res.status(404).json({ message: "Subcategory not found" });
            }
        }

        // Save the updated category
        await category.save();

        return res.status(200).json({ message: "Category update successful in database" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Category update unsucessful in database" });
    }
}

export default categoryUpdate;