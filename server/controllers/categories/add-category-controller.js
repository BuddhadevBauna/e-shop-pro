import Category from "../../models/category-model.js";

const addCategory = async (req, res) => {
    try {
        const { name, categoryType, subCategory } = req.body;
        // console.log({ name, categoryType, subCategory });

        const existingCtegory = await Category.findOne({$or: [{name}, {categoryType}]});
        if(existingCtegory) return res.status(400).json({message: "Category already exists."});

        await Category.create({name, categoryType, subCategory});
        return res.status(201).json({message: "Category add sucessful in database"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Category add unsucessful in database"});
    }
}

export default addCategory;