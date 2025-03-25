import Product from "../../models/product-model.js";
import Category from "../../models/category-model.js";
import { buildFilterQueryString, buildSortOption } from "./query-utils.js";

//get serarch, select, sort product
const getProduct = async (queryString, sortOption,) => {
    try {
        // console.log(queryString, sortOption);
        const products = await Product.find(queryString).sort(sortOption);
        // console.log(products);
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
        const products = await Product.find(queryString).populate('category', 'categoryType');
        const categoryTypes = products.map((product) => ({ "categoryType": product?.category?.categoryType }));
        const categories = [...new Set(categoryTypes)];
        return categories;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function findCategories(q) {
    try {
        const categories = await Category.aggregate([
            {
                $facet: {
                    // Facet 1: Top-level categories (parent: null) whose name matches q.
                    parentMatch: [
                        {
                            $match: {
                                parent: null,
                                name: { $regex: q, $options: "i" }
                            }
                        },
                        {
                            $lookup: {
                                from: "categories",  // collection name
                                localField: "_id",
                                foreignField: "parent",
                                as: "subCategory"
                            }
                        },
                        { $addFields: { source: "parent" } }
                    ],
                    // Facet 2: Child categories (parent not null) whose name matches q.
                    childMatch: [
                        {
                            $match: {
                                parent: { $ne: null },
                                name: { $regex: q, $options: "i" }
                            }
                        },
                        {
                            $lookup: {
                                from: "categories",
                                localField: "parent",
                                foreignField: "_id",
                                as: "parentDetails"
                            }
                        },
                        { $unwind: "$parentDetails" },
                        {
                            $group: {
                                _id: "$parent", // group by parent's ObjectId
                                name: { $first: "$parentDetails.name" },
                                categoryType: { $first: "$parentDetails.categoryType" },
                                subCategory: {
                                    $push: {
                                        _id: "$_id",
                                        name: "$name",
                                        categoryType: "$categoryType"
                                    }
                                },
                                source: { $first: "child" }
                            }
                        }
                    ]
                }
            },
            // Combine the two facets into one array.
            { $project: { combined: { $concatArrays: ["$parentMatch", "$childMatch"] } } },
            { $unwind: "$combined" },
            { $replaceRoot: { newRoot: "$combined" } },
            // Group by parent's _id so that if both facets return a document for the same parent,
            // we choose the one from parentMatch (full subCategory array) if available.
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    categoryType: { $first: "$categoryType" },
                    // If any document from the parent facet exists, store its subCategory.
                    subCategoryParent: {
                        $first: { $cond: [{ $eq: ["$source", "parent"] }, "$subCategory", null] }
                    },
                    // Collect any subCategory arrays coming from child facet.
                    subCategoryChild: {
                        $push: { $cond: [{ $eq: ["$source", "child"] }, "$subCategory", []] }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    categoryType: 1,
                    subCategory: {
                        $cond: [
                            { $ifNull: ["$subCategoryParent", false] },
                            "$subCategoryParent",
                            {
                                $reduce: {
                                    input: "$subCategoryChild",
                                    initialValue: [],
                                    in: { $concatArrays: ["$$value", "$$this"] }
                                }
                            }
                        ]
                    }
                }
            },
            { $sort: { name: 1 } }
        ]);
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
        let queryString = {isDeleted: false};
        let brandQueryString = {isDeleted: false};
        buildFilterQueryString({ brands, minRatings }, queryString);
        const sortOption = buildSortOption({ sortBy });

        let categories = await findCategories(q);
        // console.log(categories);

        if (category) {
            const categoryDetails = await Category.findOne({ "categoryType": category });
            category = categoryDetails._id;
        }

        if (categories.length > 0) {//If categories found
            const subCategory = categories[0]?.subCategory || [];
            if (!category) category = subCategory.length > 0 ? subCategory[0]?._id : categories[0]?._id;
        } else {//If categories not found then search for product title
            queryString.title = { $regex: q, $options: 'i' };
            brandQueryString.title = { $regex: q, $options: 'i' };
            categories = await getCategories({ title: { $regex: q, $options: 'i' } });
            // console.log(categories);
            if (!category) category = categories?.length > 0 && categories[0]?._id;
        }

        if (category) {
            queryString.category = category;
            brandQueryString.category = category;
        }

        const uniqueBrands = await getBrands(brandQueryString);
        // console.log(uniqueBrands);
        const products = await getProduct(queryString, sortOption);
        // console.log(products);
        return res.status(200).json({ categories, uniqueBrands, products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Search product unsuccessful" });
    }
}

export default searchAndSelectProductsOrCategory;