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
    const { name, subCategory } = category;
    return (
      <div className="category-container" key={index}>
        {subCategory.length === 0 ? (
          <div>
            <Link to={`/products/select/?q=${encodeURIComponent(name)}`}>
              <menu>{name}</menu>
            </Link>
          </div>
        ) : (
          <div
            onMouseOver={() => handleCategoryover(name)}
            onMouseLeave={() => handlemouseLeave()}
          >
            <Link to={`/products/select/?q=${encodeURIComponent(name)}`} className="category-menu">
              {name}
              {activeCategory === name ? <i><IoIosArrowUp /></i> : <i><IoIosArrowDown /></i>}
            </Link>
            <ul style={{ display: activeCategory === name ? "block" : "none" }}>
              {subCategory.map((subCat, subIndex) => (
                <li key={subIndex}>
                  <Link to={`/products/select/?q=${encodeURIComponent(subCat.name)}`}>{subCat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  });

  if (!categories || categories.length === 0) {
    return (
      <div className='loading'>
        <p>Loading</p>
        <span>.</span><span>.</span><span>.</span>
      </div>
    )
  }
  return (
    <div className="flex-container">
      {renderCategories}
    </div>
  );
};

export default AllCategories;
