import "./ProductListing.css";
import { useSelector } from "react-redux";
import ProductSlider from "../slider/ProductSlider";
import { useMemo } from "react";

const ProductListing = () => {
    const categories = useSelector(state => state.allCategory);
    // console.log(categories);
    const products = useSelector(state => state.allCategoriesProducts);
    // console.log(products);

    const content = useMemo(() => {
        if (!categories || !products) return <h1>Loading...</h1>;
        else {
            return (
                <section className="body">
                    {categories.map((category, index) => (
                        <div key={index}>
                            {category.subCategory.length === 0 ? (
                                products[category.categoryType] && (
                                    <div className="category-product-container">
                                        <h1>{category.name}</h1>
                                        <ProductSlider
                                            products={products[category.categoryType]}
                                        />
                                    </div>
                                )
                            ) : (
                                <>
                                    {category.subCategory.map((subCat, subIndex) => (
                                        products[subCat.categoryType] && (
                                            <div className="category-product-container" key={subIndex}>
                                                <h1>All {subCat.name} item</h1>
                                                <ProductSlider
                                                    products={products[subCat.categoryType]}
                                                />
                                            </div>
                                        )
                                    ))}
                                </>
                            )}
                        </div>
                    ))}
                </section>
            );
        }
    }, [categories, products]);

    return content;
}

export default ProductListing;