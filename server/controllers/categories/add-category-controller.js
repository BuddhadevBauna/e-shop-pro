import Category from "../../models/category-model.js";

const addCategory = async (req, res) => {
    try {
        const { name, categoryType, subCategory, parent } = req.body;
        // console.log({ name, categoryType, subCategory, parent });

        if (parent) { //this section for only one category add(logicallly category with parent)
            const existingCategory = await Category.findOne({ $or: [{ name }, { categoryType }] });
            if (existingCategory) return res.status(400).json({ message: "Parent category already exists." });
            await Category.create({ name, categoryType, parent });
        } else { //this section for add one category with parent null and another multiple category with parent(the adding category id -> parent)
            const existingCategory = await Category.findOne({ $or: [{ name }, { categoryType }] });
            if (existingCategory) return res.status(400).json({ message: "Parent category already exists." });
            const parentCategory = await Category.create({ name, categoryType });
            let errorCategory = "";
            if (subCategory.length > 0) {
                for (const subCat of subCategory) {
                    const existingSub = await Category.findOne({ $or: [{ "name": subCat.name }, { "categoryType": subCat.categoryType }] });
                    if (existingSub) {
                        errorCategory += `${subCat.name} `;
                        continue;
                    }
                    await Category.create({ "name": subCat.name, "categoryType": subCat.categoryType, "parent": parentCategory._id });
                }
                if (errorCategory.length > 0) return res.status(207).json({ message: `${errorCategory}category only not added as these are already exists.` });
            }
        }
        return res.status(201).json({ message: "Category add sucessful in database" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "server error during add category with subcategory" });
    }
}

export default addCategory;