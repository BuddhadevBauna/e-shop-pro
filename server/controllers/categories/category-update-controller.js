import Category from "../../models/category-model.js";

const categoryUpdate = async (req, res) => {
    try {
        const { particularCategory } = req.params;
        // console.log(particularCategory);
        const updateCategoryData = req.body;
        // console.log(updateCategoryData);
        const updatedCategory = await Category.findOneAndUpdate({name: particularCategory},updateCategoryData);
        if(updatedCategory ) return res.status(200).json({message: "Category update sucessful in database"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Category unsuccessful unsucessful in database"});
    }
}

export default categoryUpdate;