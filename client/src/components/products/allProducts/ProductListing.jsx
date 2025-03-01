import "./ProductListing.css";
import { useSelector } from "react-redux";
import ProductSlider from "../slider/ProductSlider";

const ProductListing = () => {
    const categories = useSelector(state => state.allCategory);
    const products = useSelector(state => state.allCategoriesProducts);
    // console.log(categories, products);

    if (!categories || !products) {
        return (
            <div className='loading home-page'>
                <p>Loading</p>
                <span>.</span><span>.</span><span>.</span>
            </div>
        )
    }
    return (
        <section>
            {categories.map((category, index) => (
                <div key={index}>
                    {category.subCategory.length === 0 ? (
                        products[category.categoryType] && (
                            <div className="category-product-container">
                                <h1>All {category.name} item</h1>
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

export default ProductListing;