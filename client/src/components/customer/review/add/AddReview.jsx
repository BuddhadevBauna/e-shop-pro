import { useState } from "react";
import "./AddReview.css";
import { useAuth } from "../../../../store/context/auth";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddReview = () => {
    const {token, loginUserData} = useAuth();
    // console.log(token, loginUserData);
    const {productId} = useParams();
    // console.log(productId);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        rating: 1,
        reviewHeading: "",
        reviewDescription: ""
    })

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: name === "rating" ? (value === "" ? "" : Number(value)) : value
        }));
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        const addRating = async () => {
            try {
                const finalInput = {product: productId, reviewOwner: loginUserData?.extraUserData?.id, ...input};
                // console.log(finalInput);
                const response = await axios.post(`http://localhost:3030/reviews/add`, finalInput, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 201) {
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
    }

    return (
        <>
            <div className="rating-add-container">
                <h1 className="heading">Add Rating and Review</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="rating">Rating</label>
                        <input
                            type="number"
                            placeholder="Please enter your Rating"
                            id="rating"
                            autoComplete="off"
                            required
                            min={1}
                            max={5}
                            name="rating"
                            value={input.rating}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="review-heding">Review Heading</label>
                        <input
                            type="text"
                            placeholder="Please enter your review heading"
                            id="review-heding"
                            autoComplete="off"
                            required
                            name="reviewHeading"
                            value={input.reviewHeading}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="review-description">Review Description</label>
                        <input
                            type="text"
                            placeholder="Please enter your review description"
                            id="review-description"
                            autoComplete="off"
                            required
                            name="reviewDescription"
                            value={input.reviewDescription}
                            onChange={handleInput}
                        />
                    </div>
                    <button type="submit" className="btn">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddReview;