import { useCallback, useEffect, useMemo, useState } from "react";
import "./ProductDetails.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../api/products/productsAPI";

const ProductDetails = () => {
    const product = useSelector(state => state.singleProduct);
    // console.log(product);

    const { productId } = useParams();
    // console.log(productId);
    const dispatch = useDispatch();

    const getProductDetails = useCallback(() => {
        fetchProduct(dispatch, productId);
    }, [productId, dispatch]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails])


    const content = useMemo(() => {
        let { images, category } = product;
        return (
            <>
                <div className="product-details-container">
                    <div className="left-side">
                        <div className="image-container">
                            {images &&
                                <div className="verically-img-show">
                                    <button
                                        className="scroll-btn top"
                                        onClick={() => handlePrevClick()}
                                    >
                                        <i><IoIosArrowUp /></i>
                                    </button>
                                    <ul>
                                        {images.slice(startIndex, startIndex + imagesPerPage)
                                            .map((image, index) => {
                                                return (
                                                    <li key={index}>
                                                        <img
                                                            src={image}
                                                            alt={category +startIndex+ '' +index + '-img'}
                                                        />
                                                    </li>
                                                )
                                            })}
                                    </ul>
                                    <button
                                        className="scroll-btn bottom"
                                        onClick={() => handleNextClick()}
                                    >
                                        <i><IoIosArrowDown /></i>
                                    </button>
                                </div>
                            }
                            <div className="hover-img-show">
                                <h1>Hello</h1>
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="btn">Add To Cart</button>
                            <button className="btn">Buy Now</button>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="information-container">
                            <h1>Hello</h1>
                        </div>
                    </div>
                </div>
            </>
        );
    }, [product])

    return content;
}

export default ProductDetails;