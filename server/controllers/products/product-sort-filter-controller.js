import Product from "../../models/product-model.js";
import { buildFilterQueryObject, buildSearchQueryObject, buildSortOrder } from "./query-utils.js";

//sort and filter category of product
export const sortAndFilterCategryOfProduct = async (req, res) => {
    try {
        const { particularCategory } = req.params;
        // console.log(`particularCategory: ${particularCategory}`);

        let filterQueryObject = { category: particularCategory };
        buildFilterQueryObject(req.query, filterQueryObject);

        const sortOrder = buildSortOrder(req.query);

        const products = await Product.find(filterQueryObject).sort(sortOrder);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json("filter & sort category of products unsuccessful");
    }
}

//sort and filter search product
export const sortAndFilterSearchProducts = async (req, res) => {
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
        // console.log(finalQueryObject); 

        const sortOrder = buildSortOrder(req.query);

        const products = await Product.find(finalQueryObject).sort(sortOrder);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json("filter & sort search products unsuccessful");
    }
}