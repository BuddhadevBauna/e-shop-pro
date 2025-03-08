import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFetchCategorySugession = () => {
    const categories = useSelector(state => state.allCategory);
    const products = useSelector(state => state.allCategoriesProducts);

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (categories.length > 0 && !products.isCategoriesOfProductsLoading) {
            // console.log(categories);
            // console.log(products);
            let results = [];
            categories.forEach((category) => {
                if(!category.subCategory || category.subCategory.length === 0) {
                    results.push(category.name);
                } else {
                    category?.subCategory.forEach(sub => results.push(sub.name));
                }
            });
            setSuggestions(results);
        }
    }, [categories, products]);

    return suggestions;
}

export default useFetchCategorySugession;