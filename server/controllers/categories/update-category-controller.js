import Category from "../../models/category-model.js";

const categoryOrSubCategoryUpdate = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.query;
        // console.log(categoryId);
        const { name, categoryType } = req.body;
        // console.log(name, categoryType);

        if (!subCategoryId) {
            const category = await Category.findOne({ _id: categoryId });
            if (!category) return res.status(404).json({ message: "Category not found" });
            // console.log(category);
            category.name = name;
            category.categoryType = categoryType;
            await category.save();
            return res.status(200).json({ message: "Category update successful in database" });
        } else {
            const subCategory = await Category.findOne({_id: subCategoryId, parent: categoryId});
            // console.log(subCategory);
            if (!subCategory) return res.status(404).json({ message: "Sub Category not found" });
            subCategory.name = name;
            subCategory.categoryType = categoryType;
            await subCategory.save();
            return res.status(200).json({ message: "SubCategory update successful in database" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Category update unsucessful in database" });
    }
}

export default categoryOrSubCategoryUpdate;