import Category from "../../models/category-model.js";

const categoryUpdate = async (req, res) => {
    try {
        const { categoryName } = req.params;
        // console.log(categoryName);
        const updatedData = req.body;
        // console.log(updatedData);

        // Find the main category by name
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        // console.log(category);

        // Update main category name if present in the request body
        if (updatedData.name) {
            category.name = updatedData.name;
        }
        // Update main category type if present in the request body
        if (updatedData.categoryType) {
            category.categoryType = updatedData.categoryType;
        }

        // Update subcategory if subCategoryId is  provided in the request body
        if (updatedData.subCategoryId) {
            const subcategoryIndex = category.subCategory.findIndex(
                sub => sub._id.toString() === updatedData.subCategoryId
            );
            // console.log(subcategoryIndex);

            if (subcategoryIndex !== -1) {
                // Update subcategory fields if they are present in the request body
                if (updatedData.subCategoryName) {
                    category.subCategory[subcategoryIndex].name = updatedData.subCategoryName;
                }
                if (updatedData.subCategoryType) {
                    category.subCategory[subcategoryIndex].categoryType = updatedData.subCategoryType;
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