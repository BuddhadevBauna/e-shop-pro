import Product from "../../models/product-model.js";
import Category from "../../models/category-model.js";

//search producs
const searchProductsOrCategory = async (req, res) => {
    try {
        const { q } = req.query;
        // console.log(q);
        if (!q) {
            return res.status(400).json({ message: "Query parameter 'q' is required" });
        }
        
        const categories = await Category.find({name: {$regex: q, $options: 'i'}});
        if(categories.length > 0) {
            return res.status(200).json({searchData : "categories", categories}); 
        }

        // If no categories found, search products by title
        const products = await Product.find({ title: { $regex: q, $options: 'i' }});
        if (products.length > 0) {
            return res.status(200).json({ searchData: "products", products });
        } else {
            // If no products match the search criteria
            return res.status(200).json({ searchData: "products", products });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ meaasge: "Search product unsuccessful" });
    }
}

export default searchProductsOrCategory;