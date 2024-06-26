import React, { useState } from "react";
import "./AllCategories.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const AllCategories = () => {
  const categories = useSelector((state) => state.allCategory);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryover = (name) => {
    setActiveCategory(name);
  }
  const handlemouseLeave = () => {
    setActiveCategory(null);
  }

  const renderCategories = categories.map((category, index) => {
    const { name, categoryType, subCategory } = category;
    return (
      <div className="category-container" key={index}>
        {subCategory.length === 0 ? (
          <div>
            <Link to={`/products/category/${categoryType}`}>
              <menu>{name}</menu>
            </Link>
          </div>
        ) : (
          <div
            onMouseOver={() => handleCategoryover(name)}
            onMouseLeave={() => handlemouseLeave()}
          >
            <Link to={`/products/category/${subCategory[0].categoryType}`} className="category-menu">
              {name}
              { activeCategory === name ? <i><IoIosArrowUp /></i> : <i><IoIosArrowDown /></i> }
            </Link>
            <ul style={{ display: activeCategory === name ? "block" : "none" }}>
              {subCategory.map((subCat, subIndex) => (
                <li key={subIndex}>
                  <Link to={`/products/category/${subCat.categoryType}`}>{subCat.name}</Link>
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
