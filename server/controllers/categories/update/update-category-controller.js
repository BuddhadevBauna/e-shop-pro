import Category from "../../../models/category-model.js";

const categoryUpdate = async (req, res) => {
    try {
        const { categoryId } = req.query;
        // console.log(categoryId);
        const {name, categoryType} = req.body;
        // console.log(name, categoryType);

        const category = await Category.findOne({ _id: categoryId });
        if (!category) return res.status(404).json({ message: "Category not found" });
        // console.log(category);

        category.name = name;
        category.categoryType = categoryType;

        await category.save();

        return res.status(200).json({ message: "Category update successful in database" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Category update unsucessful in database" });
    }
}

export default categoryUpdate;