import Category from "../../models/category-model.js";

const addCategory = async (req, res) => {
    try {
        const categoryDetails = req.body;
        console.log(categoryDetails);
        await Category.create(categoryDetails);
        return res.status(201).json({message: "Category add sucessful in database"});
    } catch (error) {
        return res.status(500).json({message: "Category add unsucessful in database"});
    }
}

export default addCategory;