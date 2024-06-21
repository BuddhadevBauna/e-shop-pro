import Product from "../../models/product-model.js";
import Category from "../../models/category-model.js";

//search producs
const searchProductsAndCategory = async (req, res) => {
    try {
        const { searchInput } = req.query;
        // console.log(searchInput);
        const categories = await Category.find({name: {$regex: searchInput, $options: 'i'}});
        if(categories.length > 0) {
            return res.status(200).json({searchData : "categories", categories}); 
        }

        // If no categories found, search products by title
        const products = await Product.find({ title: { $regex: searchInput, $options: 'i' } });
        if (products.length > 0) {
            return res.status(200).json({ searchData: "products", products });
        } else {
            // If no products match the search criteria
            return res.status(404).json({ message: "No categories or products found matching the search criteria" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ meaasge: "Search product unsuccessful" });
    }
}

export default searchProductsAndCategory;