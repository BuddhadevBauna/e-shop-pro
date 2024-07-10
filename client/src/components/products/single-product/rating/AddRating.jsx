import { useState } from "react";
import "./AddRating.css";

const AddRating = () => {
    const [input, setInput] = useState({
        rating: "",
        reviewHeading: "",
        reviewDescription: ""
    })

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
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

export default AddRating;