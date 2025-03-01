import Category from "../../../models/category-model.js";

const subCategoryUpdate = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.query;
        // console.log(categoryId, subCategoryId);
        const {subCategoryName, subCategoryType} = req.body;
        // console.log(subCategoryName, subCategoryType);

        const category = await Category.findOne({ _id: categoryId });
        if (!category) return res.status(404).json({ message: "Category not found" });
        // console.log(category);

        if (subCategoryId) {
            const subCategoryIndex = category.subCategory.findIndex(
                sub => sub._id.toString() === subCategoryId
            );
            // console.log(subCategoryIndex);

            if (subCategoryIndex !== -1) {
                category.subCategory[subCategoryIndex].name = subCategoryName;
                category.subCategory[subCategoryIndex].categoryType = subCategoryType;
            } else {
                return res.status(404).json({ message: "Subcategory not found" });
            }
        } else {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        await category.save();

        return res.status(200).json({ message: "SubCategory update successful in database" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "SubCategory update unsucessful in database" });
    }
}

export default subCategoryUpdate;