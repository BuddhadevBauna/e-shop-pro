import Category from "../../models/category-model.js";
import Product from "../../models/product-model.js"

//add product
const addProduct = async (req, res) => {
    try {
        const productDetails = req.body;

        const categoryName = productDetails.category;
        const category = await Category.findOne({name: categoryName});
        // console.log(category);
        if (!category) {
            return res.status(400).json({ message: "Category does not exist. Can't add product." });
        }

        productDetails.category = category._id;
        // console.log(productDetails);

        await Product.create(productDetails);
        return res.status(201).json({message: "add product sucessful in database."});
    } catch (error) {
        // console.error(error);
        return res.status(500).json({message: "Add product unsuccessful in database"});
    }
}

export default addProduct;