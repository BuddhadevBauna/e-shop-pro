import "./SortProduct.css";
import { IoIosArrowForward } from "react-icons/io";

const SortProduct = ({setSortCriteria}) => {
    const handleSort = (sortBy) => {
        setSortCriteria(sortBy);
    }

    return (
        <div className="sort-product-container">
            <div>
                <h1 className="sort-product-heading">Sort By <i><IoIosArrowForward /></i></h1>
                <ul className="sort-product-list">
                    <li className="sort-product" onClick={() => handleSort("price_asc")}>Price - Low to High</li>
                    <li className="sort-product" onClick={() => handleSort("price_desc")}>Price - High to Low</li>
                </ul>
            </div>
        </div>
    )
}

export default SortProduct;