import { useEffect, useState } from "react";
import "./ProductSlider.css";
import ProductSlide from "./slide/ProductSlide";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const ProductSlider = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDisablePrevButton, setDisablePrevButton] = useState(true);
    const [isDisableNextButton, setDisableNextButton] = useState(false);
    const itemsPerSlide = 3;

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerSlide, 0));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + itemsPerSlide, products.length - itemsPerSlide)
        );
    };

    useEffect(() => {
        setDisablePrevButton(currentIndex === 0);
        setDisableNextButton(currentIndex + itemsPerSlide >= products.length);
    }, [currentIndex, itemsPerSlide, products.length]);

    const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerSlide);

    return (
        <>
            {products &&
                <section className={`product-slider-container`}>
                    <button
                        className={`prev-btn ${isDisablePrevButton && 'prev-btn-disable'}`}
                        onClick={handlePrevClick}
                        disabled={isDisablePrevButton}
                    >
                        <i><GrFormPrevious /></i>
                    </button>
                    <div className="product-slider">
                        {visibleProducts.map((product, index) => {
                            return (
                                <ProductSlide
                                    key={index}
                                    product={product}
                                />
                            )
                        })}
                    </div>
                    <button
                        className={`next-btn ${isDisableNextButton && 'next-btn-disable'}`}
                        onClick={handleNextClick}
                        disabled={isDisableNextButton}
                    >
                        <i><GrFormNext /></i>
                    </button>
                </section>
            }
        </>
    );
}

export default ProductSlider;