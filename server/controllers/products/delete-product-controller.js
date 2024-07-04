import Product from "../../models/product-model.js";

const deleteProduct = async (req, res) => {
    try {
        const {productId} = req.params;
        // console.log(productId);

        await Product.findByIdAndDelete({_id: productId});
        return res.status(200).json({message: "delete product successful"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "delete product unsuccessful"})
    }
}

export default deleteProduct;