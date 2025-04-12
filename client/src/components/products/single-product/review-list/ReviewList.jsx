import React from "react";

const ReviewList = ({ reviews }) => {
    // console.log(reviews);
    const getRelativeTime = (date) => {
        const now = new Date();
        const updated = new Date(date);
        const diff = Math.floor((now - updated) / 1000); // difference in seconds

        const timeFormats = [
            { unit: "year", seconds: 365 * 24 * 60 * 60 },
            { unit: "month", seconds: 30 * 24 * 60 * 60 },
            { unit: "day", seconds: 24 * 60 * 60 },
            { unit: "hour", seconds: 60 * 60 },
            { unit: "minute", seconds: 60 },
            { unit: "second", seconds: 1 },
        ];

        for (let format of timeFormats) {
            const count = Math.floor(diff / format.seconds);
            if (count > 0) {
                return `${count} ${format.unit}${count > 1 ? "s" : ""} ago`;
            }
        }
        return "just now";
    };

    return (
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
                        <p>
                            <span className="review-owner-name">{review.reviewOwner?.name}</span>
                            <span className="review-time">{getRelativeTime(review.updatedAt)}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReviewList;