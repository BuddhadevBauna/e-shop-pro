import { useEffect, useRef, useState } from "react";
import "./ProductSlider.css";
import ProductSlide from "./slide/ProductSlide";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const ProductSlider = ({ products }) => {
    const boxRef = useRef(null);
    const [showPrevButton, setShowPrevButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true);

    useEffect(() => {
        const sliderBox = boxRef.current;

        const handleScroll = () => {
            if (sliderBox.scrollLeft === 0) {
                setShowPrevButton(false);
            } else {
                setShowPrevButton(true);
            }

            if (sliderBox.scrollLeft + sliderBox.clientWidth >= sliderBox.scrollWidth) {
                setShowNextButton(false);
            } else {
                setShowNextButton(true);
            }
        };

        handleScroll();// Check initial state on mount

        sliderBox.addEventListener("scroll", handleScroll);

        return () => {
            sliderBox.removeEventListener("scroll", handleScroll);
        };
    }, [products]);

    const handlePrevClick = () => {
        let width = boxRef.current.clientWidth;
        boxRef.current.scrollLeft -= width;
    }

    const handleNextClick = () => {
        let width = boxRef.current.clientWidth;
        boxRef.current.scrollLeft += width;
    }

    return (
        <>
            {products &&
                <section className="product-slider-container">
                    {showPrevButton &&
                        <button
                            className="prev-btn"
                            onClick={handlePrevClick}
                        >
                            <i><GrFormPrevious /></i>
                        </button>
                    }
                    <div className="product-slider" ref={boxRef}>
                        {products.map((product, index) => {
                            return (
                                <ProductSlide
                                    key={index}
                                    product={product}
                                />
                            )
                        })}
                    </div>
                    {showNextButton &&
                        <button
                            className="next-btn"
                            onClick={handleNextClick}
                        >
                            <i><GrFormNext /></i>
                        </button>
                    }
                </section>
            }
        </>
    );
}

export default ProductSlider;