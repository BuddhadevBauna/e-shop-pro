import React, { useEffect, useState } from "react";
import "./AllCategories.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCategories } from "../../../store/redux/reducers/categorySlice";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const AllCategories = () => {
  const categories = useSelector((state) => state.allCategory);
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchProductsCategory = async () => {
      try {
        const response = await axios.get('http://localhost:3030/categories');
        if (response.status === 200) {
          dispatch(setCategories(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductsCategory();
  }, [dispatch]);

  const handleCategoryover = (name) => {
    setActiveCategory(name);
  }
  const handlemouseLeave = () => {
    setActiveCategory(null);
  }

  const renderCategories = categories.map((category, index) => {
    const { name, url, subCategory } = category;
    return (
      <div className="category-container" key={index}>
        {url ? (
          <div>
            <Link to={`/products/category/${name}`}>
              <menu>{name}</menu>
            </Link>
          </div>
        ) : (
          <div
            onMouseOver={() => handleCategoryover(name)}
            onMouseLeave={() => handlemouseLeave()}
          >
            <Link to={'/'} className="category-menu">
              {name}
              { activeCategory === name ? <i><IoIosArrowUp /></i> : <i><IoIosArrowDown /></i> }
            </Link>
            <ul style={{ display: activeCategory === name ? "block" : "none" }}>
              {subCategory.map((subCat, subIndex) => (
                <li key={subIndex}>
                  <Link to={`/products/category/${subCat.name}`}>{subCat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="flex-container">
      {renderCategories}
    </div>
  );
};

export default AllCategories;
