import Category from "../../models/category-model.js";
import Product from "../../models/product-model.js";

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        // console.log(productId);
        const updatedProductData = req.body;

        const categoryName = updatedProductData.category;
        // console.log(categoryName);
        if (categoryName) {
            const category = await Category.findOne({ name: categoryName });
            // console.log(category);
            if (!category) {
                return res.status(400).json({ message: "Category does not exist. Can't add product." });
            }
            updatedProductData.category = category._id;
        }
        // console.log(updatedProductData);

        const updatedProduct = await Product.findByIdAndUpdate({_id: productId}, updatedProductData);
        // console.log(updateProduct);
        if(!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        return res.status(200).json({message: "update product successful."});
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "update product unsuccessful." })
    }
}

export default updateProduct;