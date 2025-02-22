import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Ratings = () => {
    const location = useLocation();
    const navigate = useNavigate();

    let selectedRatings = useMemo(() => {
        const url = new URL(window.location.origin + location.pathname + location.search);
        let query = url.searchParams;
        return query.get("minRatings") ? query.get("minRatings").split(",") : [];
    }, [location.search]);


    const handleRatingChange = (minRating) => {
        const url = new URL(window.location.origin + location.pathname + location.search);
        let query = url.searchParams;

        let updatedRatings = selectedRatings.includes(minRating)
            ? selectedRatings.filter(rating => rating !== minRating)
            : [...selectedRatings, minRating];

        if (updatedRatings.length > 0) query.set("minRatings", updatedRatings.join(","));
        else query.delete("minRatings");

        navigate(`${url.pathname}?${query.toString()}`);
    }

    return (
        <div className="filter-rating">
            <h1 className="rating-header">Rating</h1>
            <div>
                <ul>
                    <li>
                        <input
                            type="checkbox"
                            checked={selectedRatings.includes("2")}
                            onChange={() => handleRatingChange("2")}
                        />
                        2★ & above
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            checked={selectedRatings.includes("3")}
                            onChange={() => handleRatingChange("3")}
                        />
                        3★ & above
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            checked={selectedRatings.includes("4")}
                            onChange={() => handleRatingChange("4")}
                        />
                        4★ & above
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Ratings;