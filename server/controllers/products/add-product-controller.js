import Product from "../../models/product-model.js"

//add product
const addProduct = async (req, res) => {
    try {
        const productDetails = req.body;
        const newProduct = await Product.create(productDetails);
        return res.status(201).json({message: "add product sucessful in database.", product: newProduct});
    } catch (error) {
        return res.status(500).json({message: "add product unsucessful in database.", error});
    }
}

export default addProduct;