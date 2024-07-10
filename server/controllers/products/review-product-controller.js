import Product from "../../models/product-model.js";

const reviewProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviewData = req.body;
        // console.log(productId, reviewData);

        const productReview = await Product.findByIdAndUpdate(
            {_id: productId},
            { $push: { reviews: reviewData } },
            { new: true, runValidators: true }
        );
        if(productReview) {
            return res.status(200).json({message: "Product Review successful"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Product Review unsuccessful"});
    }
}

export default reviewProduct;