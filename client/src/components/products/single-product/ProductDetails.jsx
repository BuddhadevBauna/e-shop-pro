import { useCallback, useEffect, useMemo, useState } from "react";
import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../api/products/productsAPI";
import { useAuth } from "../../../store/context/auth-context";
import AddToCart from "./add_to_cart/AddToCart";
import { FaBolt } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import Notify from "./notify/Notify";

const ProductDetails = () => {
    const product = useSelector(state => state.singleProduct);
    // console.log(product);
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState("");
    const [showImage, setShowImage] = useState("");
    const { cartData, isLoadingCartData } = useAuth();
    const [isProductExistInCart, setProductExistInCart] = useState(false);

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
            setActiveImage(product.images[0]);
            setShowImage(product.images[0]);
        }
    }, [product]);

    const handleImageChange = (image) => {
        setActiveImage(image);
        setShowImage(image);
    };

    useEffect(() => {
        if (!isLoadingCartData) {
            if (cartData && productId) {
                setProductExistInCart(cartData.items?.some(item => item?.product?._id === productId));
            } else {
                setProductExistInCart(false);
            }
        }
    }, [cartData, isLoadingCartData, productId]);


    const content = useMemo(() => {
        if (loading) {
            return <h1>Loading...</h1>;
        }

        let { images, category, title, description, mrp, discountPercentage, salePrice, rating,
            brand, stock, availabilityStatus, returnPolicy, warrantyInformation,
            shippingInformation, reviews = [], isDeleted
        } = product;

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
                                                            className={`${activeImage === image ? "active" : ""}`}
                                                            onMouseOver={() => handleImageChange(image)}>
                                                            <img
                                                                src={image}
                                                                alt={category.name + index + '-img'}
                                                            />
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <div className="hover-img-show">
                                            <img src={showImage} alt={category.name + '-img'} />
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="button-container">
                                {(isDeleted || stock === 0) ? (
                                    <Notify 
                                        productId={productId}
                                        isDeleted={isDeleted}
                                        stock={stock}
                                    />
                                ) : (
                                    <>
                                        {isProductExistInCart ? (
                                            <Link to={'/viewcart'} className={`btn cart-btn`}>
                                                <i><MdShoppingCartCheckout /></i>
                                                <span>Go To Cart</span>
                                            </Link>
                                        ) : (
                                            <AddToCart
                                                productId={productId}
                                            />
                                        )}
                                        <button className={`btn buy-btn`}>
                                            <i><FaBolt /></i>
                                            <span>Buy Now</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="information-container">
                            <div className="information">
                                <p className="title">{title}</p>
                                <p className="description">{description}</p>
                                {brand && <p className="brand">Brand : {brand}</p>}
                                <p className="rating">
                                    <span className="rate">{rating} ★</span>
                                    <span>
                                        <small>10 Rating & 10 Review</small>
                                    </span>
                                </p>
                            </div>
                            <div className="information">
                                <h4 className="price-heading">Spacial Price :</h4>
                                <p className="price">
                                    <span>₹ {salePrice}</span>
                                    <span className="mrp">₹ {mrp}</span>
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
                                    <Link to={'review/add'}>
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
    }, [product, showImage, loading, isProductExistInCart])

    return content;
}

export default ProductDetails;