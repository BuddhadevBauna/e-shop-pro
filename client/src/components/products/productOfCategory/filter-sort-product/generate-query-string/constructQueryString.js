const constructQueryString = (brandFilters, priceFilters, ratingFilters) => {
    const query = [];
    // Add brand filters to the query
    if (brandFilters.length > 0) {
        query.push(`filterBrand=${brandFilters.join(",")}`);
    }
    // Add price filters to the query
    if (priceFilters.length > 0) {
        const priceQueries = [];
        priceFilters.forEach(price => {
            if (price === "500 & bellow") priceQueries.push("maxPrice=500");
            if (price === "1000 & bellow") priceQueries.push("maxPrice=1000");
            if (price === "1500 & bellow") priceQueries.push("maxPrice=1500");
            if (price === "2000 & above") priceQueries.push("minPrice=2000");
        });
        query.push(priceQueries.join("&"));
    }
    // Add rating filters to the query
    if (ratingFilters.length > 0) {
        const ratingQueries = [];
        ratingFilters.forEach(rating => {
            if (rating === "2★ & above") ratingQueries.push("minRating=2");
            if (rating === "3★ & above") ratingQueries.push("minRating=3");
            if (rating === "4★ & above") ratingQueries.push("minRating=4");
        });
        query.push(ratingQueries.join("&"));
    }
    return query.length > 0 ? `?${query.join("&")}` : "";
};

export default constructQueryString;