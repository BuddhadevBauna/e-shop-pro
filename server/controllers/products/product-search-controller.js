import { buildSearchQueryObject } from "./query-utils.js";
import Product from "../../models/product-model.js";

//search producs
const searchProducts = async (req, res) => {
    try {
        // console.log(req.query);
        const searchQueryObject = buildSearchQueryObject(req.query);

        if (Object.keys(searchQueryObject).length === 0) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const products = await Product.find(searchQueryObject);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({meaasge: "Search product unsuccessful"});
    }
}

export default searchProducts;