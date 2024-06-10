import Product from "../../models/product-model.js";
import { buildFilterQueryObject, buildSearchQueryObject } from "./query-utils.js";

//filter category of Product
export const filterCategoryOfProduct = async (req, res) => {
    try {
        const { particularCategory } = req.params;
        
        let filterQueryObject = { category: particularCategory };
        buildFilterQueryObject(req.query, filterQueryObject);

        const products = await Product.find(filterQueryObject);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json("filter category of products unsuccessful");
    }
}
//filter search product
export const filterSearchProducts = async (req, res) => {
    try {
        const searchQueryObject = buildSearchQueryObject(req.query);
        if (Object.keys(searchQueryObject).length === 0) {
            return res.status(400).json({ message: "Search query is required" });
        }

        let filterQueryObject = {};
        if(req.query.filterCategory) {
            filterQueryObject.category = {category: {$regex: filterCategory, $options: 'i'}};
        }
        buildFilterQueryObject(req.query, filterQueryObject);

        const finalQueryObject = { ...searchQueryObject, ...filterQueryObject };
        console.log(finalQueryObject);

        const products = await Product.find(finalQueryObject);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json("filter search products unsuccessful");
    }
}