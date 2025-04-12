import React, { useEffect, useState } from "react";
import "./AddRating.css";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../../../../../../../store/context/auth-context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddRating = () => {
    const { loginUserData } = useAuth();
    const userId = loginUserData?.extraUserData?.id;
    const { productId } = useParams();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const fetchRatingAndReview = async () => {
        try {
            const url = `http://localhost:3030/rating-and-review?product=${productId}&reviewOwner=${userId}`;
            const response = await axios.get(url, { withCredentials: true });
            // console.log(response?.data?.ratingAndReview?.rating);
            if (response.status >= 200 && response.status <= 300) {
                setRating(response?.data?.ratingAndReview?.rating ?? 0);
            }
        } catch (error) {
            // console.log(error);
        }
    }
    useEffect(() => {
        fetchRatingAndReview();
    });

    const handleRatingClick = async (star) => {
        try {
            const data = {
                product: productId,
                reviewOwner: loginUserData?.extraUserData?.id,
                rating: star,
            };
            const response = await axios.patch('http://localhost:3030/ratings/add', data, { withCredentials: true });
            if (response.status >= 200 && response.status <= 300) {
                toast.success(response?.data?.message);
                fetchRatingAndReview();
            }
        } catch (error) {
            // console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className="rating-container">
            <h2>Rate this product</h2>
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={`star ${star <= (hover || rating) ? "active" : ""}`}
                        onClick={() => handleRatingClick(star)}
                        onMouseOver={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    />
                ))}
            </div>
        </div>
    );
}

export default AddRating;