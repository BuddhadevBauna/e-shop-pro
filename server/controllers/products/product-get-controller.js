import Product from "../../models/product-model.js";

//get all products
export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "All product get unsucessful"});
    }
}

//get category of products
export const getCategoryOfProduct = async (req, res) => {
    try {
        const { particularCategory } = req.params;
        // console.log(particularCategory);
        const products = await Product.find({category: particularCategory});
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Product of particular category find unsuccessful"});
    }
}

//get single product
export const getSingleProduct = async (req, res) => {
    try {
        const { particularId } = req.params;
        // console.log(particularId);
        const product = await Product.findById(particularId);
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Particular product find unsuccessful"});
    }
}