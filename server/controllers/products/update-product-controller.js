import Product from "../../models/product-model.js";

const updateProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        // console.log(productId);
        const updatedProductData = req.body;
        // console.log(updatedProductData);
        
        const updatedProduct = await Product.findByIdAndUpdate({_id: productId}, updatedProductData);
        if(!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({message: "update product successful"});
    } catch (error) {
        // console.error(error);
        return res.status(500).json({message: "update product not successful"})
    }
}

export default updateProduct;