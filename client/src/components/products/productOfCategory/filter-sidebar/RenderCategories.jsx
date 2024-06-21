import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

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

    const [visibleSubCategories, setVisibleSubCategories] = useState({0: true});
    const toggleSubCategory = (index) => {
        setVisibleSubCategories((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };
    // console.log(visibleSubCategories);

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
                        <menu
                            className="subcategory-heading"
                            onClick={() => toggleSubCategory(index)}
                        >
                            {!visibleSubCategories[index] ? <i><IoIosArrowForward /></i> : <i><IoIosArrowDown /></i>}
                            {name}
                        </menu>
                        {visibleSubCategories[index] &&
                            <ul className="subCategory-ul">
                                {subCategory.map((subCat, subInd) => {
                                    return (
                                        <li onClick={() => handleSearchCategory(subCat.categoryType)}
                                            key={subInd}>
                                            {subCat.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        }
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