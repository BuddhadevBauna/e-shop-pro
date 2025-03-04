import mongoose from "mongoose";
import Category from "../../../models/category-model.js";
import Product from "../../../models/product-model.js";

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;
        // console.log(categoryId);
        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

        const categoryArray = await Category.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "parent",
                    as: "subCategory"
                }
            },
            {
                $match: { _id: categoryObjectId }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    categoryType: 1,
                    subCategory: {
                        _id: 1,
                        name: 1,
                        categoryType: 1
                    }
                }
            }
        ]);
      
        // console.log(categoryArray);
        if (categoryArray.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        const category = categoryArray[0];
        // console.log(category);

        let typeToCheck = [];
        if (category.subCategory && category.subCategory.length > 0) {
            typeToCheck = category.subCategory.map(sub => new mongoose.Types.ObjectId(sub._id));
        } else {
            typeToCheck.push(new mongoose.Types.ObjectId(category._id));
        }
        typeToCheck.push(categoryObjectId);
        // console.log(typeToCheck);
        const products = await Product.find({ category: { $in: typeToCheck } });
        // console.log(products);
        if(products.length > 0) {
            return res.status(400).json({message: "Category cannot be deleted because it's corresponding product present."});
        }

        await Category.deleteMany({_id: {$in: typeToCheck}});
        return res.status(200).json({ message: "Category delete successful from database" });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default deleteCategory;