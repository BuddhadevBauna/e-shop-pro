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
        let { images, category } = product;
        return (
            <>
                <div className="product-details-container">
                    <div className="left-side">
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
                    <div className="right-side">
                        <div className="information-container">
                            <h1>Hello</h1>
                        </div>
                    </div>
                </div>
            </>
        );
    }, [product, showImage])

    return content;
}

export default ProductDetails;