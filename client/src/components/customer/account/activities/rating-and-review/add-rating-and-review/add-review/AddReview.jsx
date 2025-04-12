import React, { useState } from "react";
import "./AddReview.css";
import axios from "axios";
import { useAuth } from "../../../../../../../store/context/auth-context";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddReview = () => {
    const { loginUserData } = useAuth();
    const userId = loginUserData?.extraUserData?.id;
    const { productId } = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        reviewHeading: "",
        reviewDescription: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const addRating = async () => {
            try {
                const finalInput = { product: productId, reviewOwner: userId, ...input };
                // console.log(finalInput);
                const response = await axios.post(`http://localhost:3030/reviews/add`, finalInput, { withCredentials: true });
                if (response.status >= 200 && response.status <= 300) {
                    toast.success(response?.data?.message);
                }
            } catch (error) {
                // console.error(error);
                toast.error(error?.response?.data?.message);
            } finally {
                navigate(`/products/${productId}`);
            }
        }
        addRating();
    };

    return (
        <div className="review-container">
            <h2>Review this product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea
                        id="review-description"
                        autoComplete="off"
                        placeholder=" "
                        required
                        name="reviewDescription"
                        value={input.reviewDescription}
                        onChange={handleInput}
                    />
                    <label htmlFor="review-description">Review description...</label>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="review-heading"
                        autoComplete="off"
                        placeholder=" "
                        name="reviewHeading"
                        value={input.reviewHeading}
                        onChange={handleInput}
                    />
                    <label htmlFor="review-heading">Review title(optional)...</label>
                </div>
                <button type="submit" className="btn">
                    Add Review
                </button>
            </form>
        </div>
    );
}

export default AddReview;