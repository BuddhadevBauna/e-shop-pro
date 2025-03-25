import Product from "../../models/product-model.js";

const changeStatus = async(req, res) => {
    try {
        const {productId} = req.params;
        const data = req.body;
        // console.log(productId, data);
        
        if(!productId) return res.status(400).json({message: "Product id required."});

        const response = await Product.updateOne({_id: productId}, {$set: data});
        return res.status(200).json({message: "Change product status successful."});
    } catch (error) {
        return res.status(500).json({message: "Change product status unsuccessful."});
    }
}

export default changeStatus;