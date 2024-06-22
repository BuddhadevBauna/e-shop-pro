import Category from "../../models/category-model.js";

//get all Category
export const getAllCategory = async (req, res) => {
    try {
        const products = await Category.find({});
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "All product get unsucessful"});
    }
}