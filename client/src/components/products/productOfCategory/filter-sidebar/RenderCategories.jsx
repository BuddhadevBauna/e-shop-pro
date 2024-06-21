import { IoIosArrowUp } from "react-icons/io";

const RenderCategories = (props) => {
    const { particularCategory, searchCategories, searchProducts, setSearchCategory,
        setSearchProductsCategory
    } = props;
    const handleSearchCategory = (category) => {
        setSearchCategory(category);
    };
    const handleSearchProducts = (category) => {
        setSearchProductsCategory(category);
    };

    if (particularCategory) {
        return <li>{particularCategory}</li>;
    }
    if (searchCategories.length > 0) {
        return (
            searchCategories.map((category, index) => {
                const { name, url, subCategory } = category;
                return url ? (
                    <li key={index}>{name}</li>
                ) : (
                    <div key={index}>
                        <menu>{name}<i><IoIosArrowUp /></i></menu>
                        <ul>
                            {subCategory.map((subCat, index) => {
                                return (
                                    <li onClick={() => handleSearchCategory(subCat.categoryType)}
                                        key={index}>
                                        {subCat.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })
        )
    }
    if (searchProducts) {
        const uniqueCategories = [...new Set(searchProducts.map((product) => product.category))];
        return (
            <ul>
                {
                    uniqueCategories.map((category, index) => {
                        return (
                            <li onClick={() => handleSearchProducts(category)}
                                key={index}>
                                {category}
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
}
export default RenderCategories;