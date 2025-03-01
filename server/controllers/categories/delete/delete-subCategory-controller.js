import Category from "../../../models/category-model.js";
import Product from "../../../models/product-model.js";

const deleteSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.query;
        // console.log(categoryId, subCategoryId);       

        const subCategory = await Category.findOne(
            { _id: categoryId, "subCategory._id": subCategoryId },
            { "subCategory.$": 1 }
        );
        if (!subCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        // console.log(subCategory);

        let categoryType = subCategory.subCategory[0]?.categoryType;

        const products = await Product.find({ category: categoryType });
        if (products.length > 0) {
            return res.status(400).json({ message: "Category cannot be deleted because it's corresponding product present." });
        }

        await Category.updateOne(
            { _id: categoryId },
            { $pull: { subCategory: { _id: subCategoryId } } }
        );
        return res.status(200).json({ message: "subCategory delete successful from database" });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default deleteSubCategory;