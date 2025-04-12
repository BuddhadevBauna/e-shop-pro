import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Account.css";
import "./FavouriteItems.css";
import { useAuth } from "../../../../../store/context/auth-context";
import PaginationControll from "../pagination/PaginationControll";
import { MdDelete } from "react-icons/md";
import { useWishlist } from "../../../../../store/context/wishlist-context";

const FavouriteItems = () => {
    const { loginUserData } = useAuth();
    const userId = loginUserData?.extraUserData?.id;
    const { removeItemFromWishlist } = useWishlist();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoadingWishlistItems, setLoadingWishlistItems] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchWishlistItems = async (page = 1) => {
        try {
            const limit = 3;
            const response = await axios.get(`http://localhost:3030/wishlists/paginated?user=${userId}&page=${page}&limit=${limit}`, { withCredentials: true });
            // console.log(response);
            setWishlistItems(response?.data?.wishlists);
            setCurrentPage(response?.data?.currentPage);
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            // console.error("Error fetching wishlist:", error);
        } finally {
            setLoadingWishlistItems(false);
        }
    };

    useEffect(() => {
        fetchWishlistItems();
    }, []);

    const deleteWishlistItem = async (productId) => {
        await removeItemFromWishlist(userId, productId);
        if(wishlistItems.length === 1 && currentPage > 1) {
            await fetchWishlistItems(currentPage - 1);
        } else {
            await fetchWishlistItems(currentPage);
        }
    };

    return (
        <section className="account-container wishlist-container">
            <h2>Favourite Items</h2>
            <hr />
            {isLoadingWishlistItems ? (
                <p style={{paddingLeft: "1rem"}}>Loading...</p>
            ) : (
                wishlistItems.length > 0 ? (
                    <>
                        <ul className="wishlist">
                            {wishlistItems.map((wishlistItem) => {
                                const product = wishlistItem.product;
                                return (
                                    <React.Fragment key={wishlistItem._id}>
                                        <li className="wishlist-card">
                                            <img src={product?.thumbnail} alt={product?.title} className="wishlist-img" />
                                            <div className="wishlist-info">
                                                <h3 className="wishlist-title">{product?.title}</h3>
                                                {product &&
                                                    <p className="price-details">
                                                        {product.mrp &&
                                                            <span className="mrp">₹{product.mrp}</span>
                                                        }
                                                        {product.salePrice &&
                                                            <span className="saleprice">₹{product.salePrice}</span>
                                                        }
                                                        {product.discountPercentage &&
                                                            <span className="discount">{product.discountPercentage} % off</span>
                                                        }
                                                    </p>
                                                }
                                            </div>
                                            <i onClick={() => deleteWishlistItem(product._id)}>
                                                <MdDelete className="delete-btn" />
                                            </i>
                                        </li>
                                        <hr />
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                        <PaginationControll
                            currentPage={currentPage}
                            totalPages={totalPages}
                            fetchFunction={fetchWishlistItems}
                        />
                    </>
                ) : (
                    <p>No wishlist item available</p>
                )
            )}
        </section>
    );
};

export default FavouriteItems;