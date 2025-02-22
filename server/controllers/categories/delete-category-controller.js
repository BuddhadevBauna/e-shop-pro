import Category from "../../models/category-model.js";

const deleteCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.query;
        // console.log(categoryId, subCategoryId);       

        // Find the main category by id
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        // console.log(category);

        //delete full category
        if(!subCategoryId) {
            await Category.deleteOne({_id: categoryId})
            return res.status(200).json({ message: "Category delete successful in database" });
        } else {
            // Use Mongoose pull operator to remove the subcategory by ID
            await Category.updateOne(
                { _id: categoryId },
                { $pull: { subCategory: { _id: subCategoryId } } }
            );
            return res.status(200).json({ message: "subCategory delete successful in database" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default deleteCategory;