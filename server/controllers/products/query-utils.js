export const buildSearchQueryObject = (query) => {
    const { searchCategory, searchBrand, searchTitle } = query;
    console.log(`title: ${searchTitle}, category: ${searchCategory}, brand: ${searchBrand}`);

    const searchQueryObject = {};
    if(searchCategory) {
        searchQueryObject.category = {$regex: searchCategory, $options: 'i'};
    } else if(searchBrand) {
        searchQueryObject.brand = {$regex: searchBrand, $options: 'i'};
    } else if(searchTitle) {
        searchQueryObject.title = {$regex: searchTitle, $options: 'i'};
    }
    console.log(searchQueryObject);

    return searchQueryObject;
}