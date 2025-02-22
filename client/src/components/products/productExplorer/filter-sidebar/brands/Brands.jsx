import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Brands = () => {
    const brands = useSelector((state) => state.brandsOfSelectedOrSearchProducts);
    // console.log(brands);
    const location = useLocation();
    const navigate = useNavigate();

    let selectedBrands = useMemo(() => {
        const url = new URL(window.location.origin + location.pathname + location.search);
        return url.searchParams.get("brands") ? url.searchParams.get("brands").split(",") : [];
    }, [location.search]);

    const handleBrandChange = (brand) => {
        const url = new URL(window.location.origin + location.pathname + location.search);
        let query = url.searchParams;

        // Update selected brands
        const updatedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter((b) => b !== brand) // Remove if previously selected
            : [...selectedBrands, brand]; // Add if previously not selected

        // Modify the query parameters accordingly
        if (updatedBrands.length > 0) {
            query.set("brands", updatedBrands.join(","));
        } else {
            query.delete("brands");
        }

        // Navigate with updated query params
        navigate(`${location.pathname}?${query.toString()}`);
    };

    if (brands?.length > 0) {
        return (
            <div className="filter-brand">
                <h1 className="brand-header">Brand</h1>
                <div>
                    <ul>
                        {brands.map((brand, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => handleBrandChange(brand)}
                                />
                                {brand}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}

export default Brands;