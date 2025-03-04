import Category from "../../../models/category-model.js";
import Product from "../../../models/product-model.js";

const deleteSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.query;
        // console.log(categoryId, subCategoryId);       

        const subCategory = await Category.findOne({_id: subCategoryId, parent: categoryId});
        // console.log(subCategory);
        if (!subCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }

        const id = subCategory._id; //we use it as it in form of objectid not string

        const products = await Product.find({ category: id });
        // console.log(products);
        if (products.length > 0) {
            return res.status(400).json({ message: "SubCategory cannot be deleted because it's corresponding product present." });
        }

        await Category.deleteOne({ _id: id });
        return res.status(200).json({ message: "subCategory delete successful from database" });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default deleteSubCategory;