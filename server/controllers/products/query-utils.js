export const buildSortOrder = (query) => {
    const { sortBy } = query;
    // console.log(`sortBy: ${sortBy}`);

    let sortOrder = {};
    if (sortBy === 'price_desc') {
        sortOrder = { price: 'desc' };
    } else if(sortBy === 'price_asc') {
        sortOrder = { price: 'asc' };
    }
    // console.log(sortOrder);

    return sortOrder;
}

export const buildFilterQueryObject = (query, filterQueryObject) => {
    const { filterBrand, minPrice, maxPrice, minRating, maxRating } = query;
    // console.log(`brand: ${filterBrand}, minPrice: ${minPrice}, maxPrice: ${maxPrice}, minRating: ${minRating}, maxRating: ${maxRating}`);
    
    if(filterBrand) {
        const brands = filterBrand.split(',');
        filterQueryObject.brand = { $in: brands.map(brand => new RegExp(brand, 'i')) }
    }
    
    if(minPrice && maxPrice) filterQueryObject.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    else if(minPrice) filterQueryObject.price = { $gte: parseFloat(minPrice) };
    else if(maxPrice) filterQueryObject.price = { $lte: parseFloat(maxPrice) };
    
    if(minRating && maxRating) filterQueryObject.rating = { $gte: minRating, $lte: maxRating };
    else if(minRating) filterQueryObject.rating = { $gte: minRating };
    else if(maxRating) filterQueryObject.rating = { $lte: maxRating };
    // console.log(filterQueryObject);

    return filterQueryObject;
}