import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RenderCategories = (props) => {
    const { setFilterCategory, setFilterProductsCategory} = props;

    const searchCategories = useSelector((state) => state.searchCategories);
    const searchProducts = useSelector(state => state.searchProducts);
    // console.log(searchCategories, searchProducts);

    const params = useParams();
    const particularCategory = params.particularCategory;
    // console.log(particularCategory);

    const handleFilterCategory = (category) => {
        setFilterCategory(category);
        setFilterProductsCategory("");
    };
    const handleFilterProductsCategory = (category) => {
        setFilterProductsCategory(category);
        setFilterCategory("");
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
    else if (searchCategories.length > 0) {
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
                                        <li onClick={() => handleFilterCategory(subCat.categoryType)}
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
    else if (searchProducts) {
        const uniqueCategories = [...new Set(searchProducts.map((product) => product.category))];
        return (
            <ul>
                {
                    uniqueCategories.map((category, index) => {
                        return (
                            <li onClick={() => handleFilterProductsCategory(category)}
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