import Category from "../../../models/category-model.js";
import Product from "../../../models/product-model.js";

const deleteCategory = async (req, res) => {
    try {
        const { categoryId} = req.query;
        // console.log(categoryId);       

        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        // console.log(category);

        let typeToCheck = [];
        if(category.subCategory && category.subCategory.length > 0) {
            typeToCheck = category.subCategory.map(sub => sub.categoryType);
        } else {
            typeToCheck.push(category.categoryType);
        }
        const products = await Product.find({category: {$in: typeToCheck}});
        if(products.length > 0) {
            return res.status(400).json({message: "Category cannot be deleted because it's corresponding product present."});
        }

        await Category.deleteOne({_id: categoryId})
        return res.status(200).json({ message: "Category delete successful from database" });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default deleteCategory;