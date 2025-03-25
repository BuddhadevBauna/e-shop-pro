import Product from "../../models/product-model.js";

//get all products
export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({isDeleted: false});
        return res.status(200).json(products);
    } catch (error) {
        // console.error(error);
        return res.status(500).json({message: "All product get unsucessful"});
    }
}

//get products of ids
export const getProductsOfIds = async (req, res) => {
    try {
        const {ids} = req.query;
        if (ids) {
            const productIds = ids.split(',');
            const products = await Product.find({ _id: { $in: productIds }});
            return res.status(200).json(products);
        }
        res.status(400).json({ message: "Please provide product IDs" });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({message: "All product get unsucessful"});
    }
}

//get category of products
export const getCategoryOfProduct = async (req, res) => {
    try {
        const { particularCategoryId } = req.params;
        // console.log(particularCategoryId);
        let filter = {category: particularCategoryId};
        if(!req.isAdmin) {
            filter.isDeleted = false;
        }
        const products = await Product.find(filter).populate("category");
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }
        return res.status(200).json({products});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Product of particular category find unsuccessful"});
    }
}

//get single product
export const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        // console.log(productId);
        
        const product = await Product.findById(productId)
            .populate("category")
            .populate("reviews");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Particular product find unsuccessful"});
    }
}