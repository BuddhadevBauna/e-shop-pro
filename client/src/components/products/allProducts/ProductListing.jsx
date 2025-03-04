import "./ProductListing.css";
import { useSelector } from "react-redux";
import ProductSlider from "../slider/ProductSlider";

const ProductListing = () => {
    const categories = useSelector(state => state.allCategory);
    // console.log(categories);
    const products = useSelector(state => state.allCategoriesProducts);

    if (!categories || categories.length === 0  || !products || products?.isCategoriesOfProductsLoading) {
        return (
            <div className='loading'>
                <p>Loading</p>
                <span>.</span><span>.</span><span>.</span>
            </div>
        )
    }
    // console.log(categories);
    // console.log(products);
    // console.log(products.productsOfCategories);
    return (
        <section>
            {categories.map((category, index) => (
                <div key={index}>
                    {category.subCategory.length === 0 ? (
                        products?.productsOfCategories[category.categoryType] && (
                            <div className="category-product-container">
                                <h1>All {category.name} item</h1>
                                <ProductSlider
                                    products={products.productsOfCategories[category.categoryType]}
                                />
                            </div>
                        )
                    ) : (
                        <>
                            {category.subCategory.map((subCat, subIndex) => (
                                products?.productsOfCategories[subCat.categoryType] && (
                                    <div className="category-product-container" key={subIndex}>
                                        <h1>All {subCat.name} item</h1>
                                        <ProductSlider
                                            products={products.productsOfCategories[subCat.categoryType]}
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

export default ProductListing;