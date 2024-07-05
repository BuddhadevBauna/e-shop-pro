import { useState } from "react";
import "./ProductSlider.css";
import ProductSlide from "./slide/ProductSlide";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const ProductSlider = ({ products }) => {
    const [startIndex, setStartIndex] = useState(0);

    const nextSlide = () => {
        if (startIndex + 3 < products.length) {
            setStartIndex(prevIndex => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (startIndex > 0) {
            setStartIndex(prevIndex => prevIndex - 1);
        }
    };

    const canShowNext = startIndex + 3 < products.length;
    const canShowPrev = startIndex > 0;

    return (
        <section className="product-slider-container">
            <button 
                className={`prev-btn ${!canShowPrev ? 'disable-btn' : ''}`} 
                onClick={prevSlide}
                disabled={!canShowPrev}
            >
                <i><GrFormPrevious /></i>
            </button>
            {products.slice(startIndex, startIndex + 3).map((product, index) => {
                return (
                    <ProductSlide
                        key={index}
                        product={product}
                    />
                )
            })}
            <button 
                className={`next-btn ${!canShowNext ? 'disable-btn' : ''}`}
                onClick={nextSlide}
                disabled={!canShowNext}
            >
                <i><GrFormNext /></i>
            </button>
        </section>
    );
}

export default ProductSlider;