import { useCallback, useEffect, useMemo, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../api/products/productsAPI";

const ProductDetails = () => {
    const product = useSelector(state => state.singleProduct);
    // console.log(product);

    const [showImage, setShowImage] = useState("");

    const { productId } = useParams();
    // console.log(productId);
    const dispatch = useDispatch();

    const getProductDetails = useCallback(() => {
        fetchProduct(dispatch, productId);
    }, [productId, dispatch]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails]);

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setShowImage(product.images[0]);
        }
    }, [product]);

    const handleImageChange = (image) => {
        setShowImage(image);
    };


    const content = useMemo(() => {
        let { images, category, title, price, discountPercentage, rating, brand, stock,
            availabilityStatus, returnPolicy, warrantyInformation, shippingInformation
        } = product;
        let MRP = price / (1 - discountPercentage / 100);
        let MRPInt = Math.round(MRP);
        return (
            <>
                <div className="product-details-container">
                    <div className="left-side">
                        <div className="left-side-container">
                            <div className="image-container">
                                {images &&
                                    <>
                                        <div className="verically-img-show">
                                            <ul>
                                                {images.map((image, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            onMouseOver={() => handleImageChange(image)}>
                                                            <img
                                                                src={image}
                                                                alt={category + index + '-img'}
                                                            />
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <div className="hover-img-show">
                                            <img src={showImage} alt={category + '-img'} />
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="button-container">
                                <button className="btn">Add To Cart</button>
                                <button className="btn">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="information-container">
                            <div className="information">
                                <p className="title">{title}</p>
                                <p className="brand">Brand : {brand}</p>
                                <p className="rating">
                                    <span className="rate">{rating} ★</span>
                                    <span>
                                        <small>10 Rating & 10 Review</small>
                                    </span>
                                </p>
                            </div>
                            <div className="information">
                                <h4 className="price-heading">Spacial Price</h4>
                                <p className="price">
                                    <span>₹ {price}</span>
                                    <span className="mrp">₹ {MRPInt}</span>
                                    <span className="discount">{discountPercentage}% off</span>
                                </p>
                            </div>
                            <div className="information">
                                <p className="extra-info">
                                    <span className="stock">{stock} Item</span>
                                    <span className="available-status">{availabilityStatus}</span>
                                </p>
                                <p className="return-policy">{returnPolicy}</p>
                            </div>
                            <div className="information">
                                <p className="warenty">{warrantyInformation}</p>
                                <p className="ships">{shippingInformation}</p>
                            </div>
                            <div className="information">
                                <div className="add-rating">
                                    <h4>Rating & Review</h4>
                                    <button>Rate Product</button>
                                </div>
                                <div className="all-rating">
                                    <div className="rating-review">
                                        <h5 className="rating-title">
                                            <span className="rate">4 ★</span>
                                            <span className="rate-heading">WonderFul</span>
                                        </h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                    <div className="rating-review">
                                        <h5 className="rating-title">
                                            <span className="rate">4 ★</span>
                                            <span className="rate-heading">WonderFul</span>
                                        </h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                    <div className="rating-review">
                                        <h5 className="rating-title">
                                            <span className="rate">4 ★</span>
                                            <span className="rate-heading">WonderFul</span>
                                        </h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                    <div className="rating-review">
                                        <h5 className="rating-title">
                                            <span className="rate">4 ★</span>
                                            <span className="rate-heading">WonderFul</span>
                                        </h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                    <div className="rating-review">
                                        <h5 className="rating-title">
                                            <span className="rate">4 ★</span>
                                            <span className="rate-heading">WonderFul</span>
                                        </h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                    <div className="rating-review">
                                        <h5 className="rating-title">
                                            <span className="rate">4 ★</span>
                                            <span className="rate-heading">WonderFul</span>
                                        </h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                    <div className="rating-review">
                                        <h5 className="rating-title">
                                            <span className="rate">4 ★</span>
                                            <span className="rate-heading">WonderFul</span>
                                        </h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }, [product, showImage])

    return content;
}

export default ProductDetails;