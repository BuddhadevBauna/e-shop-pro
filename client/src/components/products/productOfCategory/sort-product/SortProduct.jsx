import axios from "axios";
import "./SortProduct.css";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { removeSortProducts, setSortProducts } from "../../../../store/redux/reducers/sortProductSlice";

const SortProduct = () => {
    const dispatch = useDispatch();

    const handleSort = async (sortBy) => {
        try {
            dispatch(removeSortProducts());
            const products = await axios.get(`http://localhost:3030/products/category/smartphones/sort?sortBy=${sortBy}`);
            // console.log(products);
            dispatch(setSortProducts(products.data));
        } catch (error) {
            console.log(error);
        }
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