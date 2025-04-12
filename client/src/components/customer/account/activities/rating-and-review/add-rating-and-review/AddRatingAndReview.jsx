import React, { useCallback, useEffect, useState } from "react";
import "./AddRatingAndReview.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddRating from "./add-rating/AddRating";
import AddReview from "./add-review/AddReview";
import { fetchProduct } from "../../../../../../api/products/productsAPI";

const AddRatingAndReview = () => {
    const product = useSelector(state => state.singleProduct);
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const getProductDetails = useCallback(() => {
        fetchProduct(dispatch, productId).finally(() => {
            setLoading(false);
        });
    }, [productId, dispatch]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <div className="rating-and-review-container">
                <h1 className="heading">Rating & Review</h1>
                <div className="rating-review-content">
                    <div className="product-details">
                        <img src={product.thumbnail} alt="product-img" />
                        <p>{product.title}</p>
                    </div>
                    <div className="rating-review-section">
                        <AddRating />
                        <hr />
                        <AddReview />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddRatingAndReview;