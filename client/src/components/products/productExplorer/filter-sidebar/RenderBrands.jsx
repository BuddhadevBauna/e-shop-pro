import { useSelector } from "react-redux";

const RenderBrands = (props) => {
    const {filterProductsCategory, brandFilters, setBrandFilters} = props;
    
    const products = useSelector((state) => state.categoryOfProducts);
    const searchCategories = useSelector((state) => state.searchCategories);
    const searchProducts = useSelector(state => state.searchProducts);
    // console.log(products, searchCategories, searchProducts);

    const handleBrandChange = (brand) => {
        setBrandFilters((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    let uniqeBrands = [];
    if(products.length > 0) {
        products.forEach((product) => {
            if (product.brand && !uniqeBrands.includes(product.brand)) {
                uniqeBrands.push(product.brand);
            }
        });
    } else if(searchProducts.length > 0) {
        if(searchCategories.length > 0) {
            searchProducts.forEach((product) => {
                if (product.brand && !uniqeBrands.includes(product.brand)) {
                    uniqeBrands.push(product.brand);
                }
            });
        } else {
            searchProducts.forEach((product) => {
                if (product.brand && product.category === filterProductsCategory && !uniqeBrands.includes(product.brand)) {
                    uniqeBrands.push(product.brand);
                }
            });
        }
    }

    if (uniqeBrands.length > 0) {
        return (
            <div className="filter-brand">
                <h1 className="brand-header">Brand</h1>
                <div>
                    <ul>
                        {uniqeBrands.map((brand, index) => {
                            return (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        checked={brandFilters.includes(brand)}
                                        onChange={() => handleBrandChange(brand)}
                                    />
                                    {brand}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default RenderBrands;