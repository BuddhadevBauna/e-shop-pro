import Product from "../../models/product-model.js";
import { buildSearchQueryObject, buildSortOrder } from "./query-utils.js";

//sort category of Products
export const sortCategryOfProduct = async (req, res) => {
    try {
        const { particularCategory } = req.params;
        // console.log(`particularCategory: ${particularCategory}`);

        const sortOrder = buildSortOrder(req.query);

        const products = await Product.find({category: particularCategory}).sort(sortOrder);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "sort category of products unsuccessful."});
    }
}

//sort search products
export const sortSearchProducts = async (req, res) => {
    try {
        const searchQueryObject = buildSearchQueryObject(req.query);
        if (Object.keys(searchQueryObject).length === 0) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const sortOrder = buildSortOrder(req.query);

        const products = await Product.find(searchQueryObject).sort(sortOrder);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Sort search products unsuccessful");
    }
}