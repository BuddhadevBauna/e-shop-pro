import Category from "../../models/category-model.js";

//get all Category
export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "parent",
                    as: "subCategory"
                }
            },
            {
                $match: { parent: null }
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
        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Get all category unsucessful" });
    }
}

//get particular category or subcategory
export const getParticularCategoryOrSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.query;

        if (!subCategoryId) {
            let category = await Category.findOne({ _id: categoryId });
            // console.log(category);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            return res.status(200).json(category);
        } else {
            const subCategory = await Category.findOne({_id: subCategoryId, parent: categoryId});
            // console.log(subCategory);
            if (!subCategory) {
                return res.status(404).json({ message: "Sub Category not found" });
            }
            return res.status(200).json(subCategory);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Get particular category or subcategory unsucessful" });
    }
}