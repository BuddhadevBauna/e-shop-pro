import React, { useEffect, useState } from "react";
import "../../Account.css";
import "./RatingAndReviews.css";
import { useAuth } from "../../../../../store/context/auth-context";
import PaginationControll from "../pagination/PaginationControll";
import axios from "axios";
import { Link } from "react-router-dom";

const RatingAndReviews = () => {
    const { loginUserData } = useAuth();
    const userId = loginUserData?.extraUserData?.id;
    const [reviews, setReviews] = useState([]);
    const [isReviewLoading, setReviewLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchReviews = async (page = 1) => {
        const limit = 4;
        const url = `http://localhost:3030/rating-and-reviews?userId=${userId}&page=${page}&limit=${limit}`;
        try {
            const response = await axios.get(url, { withCredentials: true });
            // console.log(response.data);
            setReviews(response?.data?.reviews);
            setCurrentPage(response?.data?.currentPage);
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            // console.error("Error fetching reviews:", error);
        } finally {
            setReviewLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // if(isReviewLoading) return <p>Loading...</p>;
    return (
        <section className="account-container review-container">
            <h2>Reviews</h2>
            {isReviewLoading ? (
                <p>Loading...</p>
            ) : (
                reviews.length > 0 ? (
                    <>
                        <ul className="review-list">
                            {reviews.map((review) => {
                                const { _id, rating, reviewHeading, reviewDescription, updatedAt, product } = review;
                                return (
                                    <li key={_id} className="review-card">
                                        <Link to={`/products/${product._id}`} className="review-left">
                                            <img src={product.thumbnail} alt={product.title} className="product-image" />
                                            <div className="product-info">
                                                <h5 className="product-title">{product.title}</h5>
                                                {product &&
                                                    <p className="price-details">
                                                        {product.mrp &&
                                                            <span className="mrp">₹{product.mrp}</span>
                                                        }
                                                        {product.salePrice &&
                                                            <span className="saleprice">₹{product.salePrice}</span>
                                                        }
                                                        {product.discountPercentage &&
                                                            <span className="discount">{product.discountPercentage} % off</span>
                                                        }
                                                    </p>
                                                }
                                                <p className="product-brand">{product.brand}</p>
                                            </div>
                                        </Link>
                                        <div className="review-right">
                                            <span className="rating">{rating} ★</span>
                                            <span className="review-heading"> {reviewHeading}</span>
                                            <p className="review-description">{reviewDescription}</p>
                                            <p className="review-date">{new Date(updatedAt).toLocaleDateString()}</p>
                                            {/* <Link to={`/products/${product._id}/rating-and-review/add`} className="add-review">★ Rate & Review Product</Link> */}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <PaginationControll
                            currentPage={currentPage}
                            totalPages={totalPages}
                            fetchFunction={fetchReviews}
                        />
                    </>
                ) : (
                    <p>No reviews available.</p>
                )
            )}
        </section>
    );
}

export default RatingAndReviews;