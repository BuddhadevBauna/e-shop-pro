import { useCallback, useEffect, useMemo, useState } from "react";
import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../api/products/productsAPI";
import ClientError from "../../error/ClientError";

const ProductDetails = () => {
    const product = useSelector(state => state.singleProduct);
    // console.log(product);

    const [showImage, setShowImage] = useState("");
    const [loading, setLoading] = useState(true);

    const { productId } = useParams();
    // console.log(productId);
    const dispatch = useDispatch();

    const getProductDetails = useCallback(() => {
        setLoading(true);
        fetchProduct(dispatch, productId).finally(() => {
            setLoading(false);
        });
    }, [productId, dispatch]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails]);

    useEffect(() => {
        if (product?.images?.length > 0) {
            setShowImage(product.images[0]);
        }
    }, [product]);

    const handleImageChange = (image) => {
        setShowImage(image);
    };


    const content = useMemo(() => {
        if (loading) {
            return <h1>Loading...</h1>;
        }

        if (Object.keys(product).length == 0) return <ClientError />;

        let { images, category, title, price, discountPercentage, rating, brand, stock,
            availabilityStatus, returnPolicy, warrantyInformation, shippingInformation, reviews = []
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
                                {brand && <p className="brand">Brand : {brand}</p>}
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
                                    <span>₹ {parseInt(price)}</span>
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
                            <div className="information rating-container">
                                <div className="add-rating">
                                    <h4>Rating & Review</h4>
                                    <Link to={'review'}>
                                        <button>Rate Product</button>
                                    </Link>
                                </div>
                                <div className="all-rating">
                                    {reviews.map((review) =>
                                        <div key={review._id}>
                                            <hr />
                                            <div className="rating-review">
                                                <h5 className="rating-title">
                                                    <span className="rate">{review.rating} ★</span>
                                                    <span className="rate-heading">{review.reviewHeading}</span>
                                                </h5>
                                                <p>{review.reviewDescription}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }, [product, showImage, loading])

    return content;
}

export default ProductDetails;