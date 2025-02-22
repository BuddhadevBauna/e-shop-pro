import Product from "../../models/product-model.js";
import Category from "../../models/category-model.js";
import { buildFilterQueryString, buildSortOption } from "./query-utils.js";

//get serarch, select, sort product
const getProduct = async (queryString, sortOption,) => {
    try {
        // console.log(queryString, sortOption);
        const products = await Product.find(queryString).sort(sortOption);
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getBrands = async (queryString) => {
    try {
        const products = await Product.find(queryString);
        const brands = [...new Set(products?.map((product) => product?.brand).filter(Boolean))];
        return brands;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getCategories = async (queryString) => {
    try {
        const products = await Product.find(queryString);
        const categories = [...new Set(products?.map((product) => ({"categoryType" : product?.category})))];
        return categories;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const findCategories = async (q) => {
    try {
        //Search for cotegories first
        let categories = await Category.find({ name: { $regex: q, $options: 'i' } });

        // If no categories found, search for subcategories
        if (categories.length === 0) {
            categories = await Category.aggregate([
                {
                    $match: {
                        "subCategory.name": { $regex: q, $options: "i" }
                    }
                },
                {
                    $project: {
                        name: "$name",
                        categoryType: "$categoryType",
                        subCategory: {
                            $filter: {
                                input: "$subCategory",
                                as: "subCat",
                                cond: { $regexMatch: { input: "$$subCat.name", regex: q, options: "i" } }
                            }
                        }
                    }
                }
            ]);
        }
        return categories;
    } catch (error) {
        console.error(error);
        return [];
    }
}

//search producs
const searchAndSelectProductsOrCategory = async (req, res) => {
    try {
        let { q, category, brands, minRatings, sortBy } = req.query;
        // console.log(q, category, brands, minRatings, sortBy);

        if (!q) {
            return res.status(400).json({ message: "Query parameter 'q' is required" });
        }

        //generate query string
        let queryString = {};
        let brandQueryString = {};
        buildFilterQueryString({ brands, minRatings }, queryString);
        const sortOption = buildSortOption({ sortBy });

        let categories = await findCategories(q);

        if(categories.length > 0) {//If categories or subcategories found
            const subCategory = categories[0]?.subCategory || [];
            if(!category) category = subCategory.length > 0 ? subCategory[0]?.categoryType : categories[0]?.categoryType;
        } else {//If categories or subcategories not found then search for product title
            queryString.title = { $regex: q, $options: 'i' };
            brandQueryString.title = { $regex: q, $options: 'i' };
            categories = await getCategories({title : { $regex: q, $options: 'i' }});
            if(!category) category = categories?.length > 0 && categories[0]?.categoryType;
        }

        if(category) {
            queryString.category = category;
            brandQueryString.category = category;
        }

        const uniqueBrands = await getBrands(brandQueryString);
        const products = await getProduct(queryString, sortOption);
        return res.status(200).json({ categories, uniqueBrands, products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Search product unsuccessful" });
    }
}

export default searchAndSelectProductsOrCategory;