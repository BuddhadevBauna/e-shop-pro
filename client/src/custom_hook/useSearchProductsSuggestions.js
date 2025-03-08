import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useProductsSearchSuggestions = (searchTerm) => {
    const categories = useSelector(state => state.allCategory);
    const products = useSelector(state => state.allCategoriesProducts);

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (categories.length > 0 && !products.isCategoriesOfProductsLoading) {
            // console.log(categories);
            // console.log(products);
            let results = [];
            categories.forEach((category) => {
                results.push(category.name);
                category?.subCategory.forEach(sub => results.push(sub.name));
            });
            Object.keys(products?.productsOfCategories).forEach((key) => {
                products.productsOfCategories[key].map(product => results.push(product.title));
            })
            setSuggestions(results);
        }
    }, [categories, products]);

    return suggestions;
}

export default useProductsSearchSuggestions;