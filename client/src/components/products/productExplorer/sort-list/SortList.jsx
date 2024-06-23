import "./SortList.css";
import { IoIosArrowForward } from "react-icons/io";

const SortList = ({setSortCriteria}) => {
    const handleSort = (sortBy) => {
        setSortCriteria(sortBy);
    }

    return (
        <div className="sort-list-container">
            <div>
                <h1 className="sort-list-heading">Sort By <i><IoIosArrowForward /></i></h1>
                <ul className="sort-list-list">
                    <li className="sort-list" onClick={() => handleSort("price_asc")}>Price - Low to High</li>
                    <li className="sort-list" onClick={() => handleSort("price_desc")}>Price - High to Low</li>
                </ul>
            </div>
        </div>
    )
}

export default SortList;