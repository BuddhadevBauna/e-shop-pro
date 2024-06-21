import Product from "../../models/product-model.js";
import { buildFilterQueryObject, buildSortOrder } from "./query-utils.js";

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
        const { searchInput } = req.query;
        // console.log(`search Input: ${searchInput}`);

        let filterQueryObject = {category: searchInput};
        buildFilterQueryObject(req.query, filterQueryObject);

        const sortOrder = buildSortOrder(req.query);

        const products = await Product.find(filterQueryObject).sort(sortOrder);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json("filter & sort search products unsuccessful");
    }
}