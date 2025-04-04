import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Account.css";
import "./Notification.css";
import { toast } from "react-toastify";
import { useAuth } from "../../../../../store/context/auth-context";
import { MdDelete } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Notification = () => {
    const { token, loginUserData } = useAuth();
    const userId = loginUserData?.extraUserData?.id;
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch notifications
    const fetchNotifications = async (page = 1) => {
        const limit = 4;
        const url = `http://localhost:3030/notifications?userId=${userId}&page=${page}&limit=${limit}`;
        try {
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log(response.data);
            setNotifications(response?.data?.notifications);
            setCurrentPage(response?.data?.currentPage);
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Toggle read/unread status
    const toggleReadStatus = async (notificationId, isRead) => {
        const data = { userId, notificationId };
        const url = isRead ? "http://localhost:3030/notifications/mark-as-unread" : "http://localhost:3030/notifications/mark-as-read";
        try {
            const response = await axios.patch(url, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status >= 200 && response.status <= 300) {
                toast.success(response?.data?.message);
                fetchNotifications(currentPage);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const deleteNotification = async (notificationId) => {
        const data = { userId, notificationId };
        const url = "http://localhost:3030/notifications/delete";
        try {
            const response = await axios.delete(url, {
                data: data,
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status >= 200 && response.status <= 300) {
                toast.success(response?.data?.message);
                if (notifications.length === 1 && currentPage > 1) {
                    fetchNotifications(currentPage - 1);
                } else {
                    fetchNotifications(currentPage);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <section className="account-container notification-container">
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
                <>
                    <ul className="notification-list">
                        {notifications.map((notification) => {
                            const product = notification.typeId;
                            return (
                                <React.Fragment key={notification._id}>
                                    <li
                                        key={notification._id}
                                        className={`notification-item`}
                                    >
                                        <div className="content-wrapper">
                                            {product?.thumbnail &&
                                                <img src={product.thumbnail} alt={product.title} />
                                            }
                                            <div className={`details-container`}>
                                                <input
                                                    type="checkbox"
                                                    checked={notification.isRead}
                                                    onChange={() => toggleReadStatus(notification._id, notification.isRead)}
                                                />
                                                <div className="details-content">
                                                    {product?.title &&
                                                        <p>
                                                            <Link className="product-title" to={`/products/${product._id}`}>
                                                                {product?.title}
                                                            </Link>
                                                            <span>{notification.message.replace(/^The\b/, "")}</span>
                                                        </p>
                                                    }
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
                                            </div>
                                        </div>
                                        <i onClick={() => deleteNotification(notification._id)}>
                                            <MdDelete className="delete-btn" />
                                        </i>
                                    </li>
                                </React.Fragment>
                            )
                        })}
                    </ul>
                    {/* Pagination Controls */}
                    <div className="custom-pagination">
                        <button
                            className="pagination-btn"
                            disabled={currentPage === 1}
                            onClick={() => fetchNotifications(currentPage - 1)}
                        >
                            <FaChevronLeft />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                className={`page-number ${currentPage === pageNum ? "active" : ""}`}
                                onClick={() => fetchNotifications(pageNum)}
                            >
                                {pageNum}
                            </button>
                        ))}
                        <button
                            className="pagination-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => fetchNotifications(currentPage + 1)}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </>
            ) : (
                <p>No notifications available.</p>
            )}
        </section>
    );
};

export default Notification;
