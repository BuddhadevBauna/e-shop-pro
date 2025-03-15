export const buildSortOption = (query) => {
    const { sortBy } = query;

    let sortOption = {};
    if (sortBy === 'price_desc') {
        sortOption.salePrice = -1;
    } else if(sortBy === 'price_asc') {
        sortOption.salePrice = 1;
    }

    return sortOption;
}

export const buildFilterQueryString = (query, queryString = {}) => {
    const { brands, minRatings } = query;
    
    if(brands) {
        const brandArray = brands.split(',');
        queryString.brand = { $in: brandArray };
    }
    
    if(minRatings) {
        const ratingArray = minRatings.split(',').map(Number);
        const highestRating = Math.max(...ratingArray);
        queryString.rating = { $gte: highestRating };
    }

    return queryString;
}