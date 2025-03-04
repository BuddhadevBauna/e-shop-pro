import Category from "../../models/category-model.js";
import Product from "../../models/product-model.js"

//add product
const addProduct = async (req, res) => {
    try {
        const productDetails = req.body;
        // console.log(productDetails);
        const categoryExists = await Category.findById(productDetails.category);
        if (!categoryExists) {
            return res.status(400).json({ message: "Category does not exist. Can't add product." });
        }
        const newProduct = await Product.create(productDetails);
        return res.status(201).json({message: "add product sucessful in database.", product: newProduct});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "add product unsucessful in database.", error});
    }
}

export default addProduct;