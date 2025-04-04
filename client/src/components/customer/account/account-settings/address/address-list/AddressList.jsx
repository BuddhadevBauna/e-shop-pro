import React, { useEffect, useState } from "react";
import "./AddressList.css";
import { FiMoreVertical } from "react-icons/fi";
import EditAddress from "../edit/EditAddress";
import Popup from "../delete/Popup";
import { useAuth } from "../../../../../../store/context/auth-context";
import { useAddress } from "../../../../../../store/context/address-context";

const AddressList = ({ editId, setEditId, setAddAddressFormVisible }) => {
    const [menuId, setMenuId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const {token, loginUserData} = useAuth();
    const {addresses, getAddress} = useAddress();
    
    useEffect(() => {
        getAddress();
    }, [token, loginUserData]);

    const toggleMenu = (id) => {
        setMenuId(menuId === id ? null : id);
    };

    const handleEditClick = (id) => {
        setEditId(id);
        setAddAddressFormVisible(false);
        setMenuId(null);
    }

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setMenuId(null);
    };

    const colsePopup = () => {
        setDeleteId(null);
        document.body.classList.remove("no-scroll");
    }

    return (
        <section className="container addresslist-container" style={addresses.length === 0 ? {border: "none"} : {}}>
            {addresses.map((address, index) => {
                const { _id: id, addressType, fullName, phone, street, locality, city, state, pincode } = address;
                return (
                    <React.Fragment key={id}>
                        <div className="address-box">
                            {editId === id ? (
                                <EditAddress
                                    userAddress={address}
                                    setEditId={setEditId}
                                />
                            ) : (
                                <div className="address-content">
                                    <p className="address-type">{addressType}</p>
                                    <p className="information">
                                        <span>{fullName}</span>
                                        <span>{phone}</span>
                                    </p>
                                    <p className="location">
                                        <span>{street}, </span>
                                        <span>{locality}, </span>
                                        <span>{city}, </span>
                                        <span>{state} - </span>
                                        <span>{pincode}</span>
                                    </p>
                                </div>
                            )}
                            <div className="menu-container" style={{ display: editId === id ? "none" : 'block' }}>
                                <i>
                                    <FiMoreVertical onClick={() => toggleMenu(id)} />
                                </i>
                                {menuId === id && (
                                    <div className="menu-dropdown">
                                        <button onClick={() => handleEditClick(id)}>Edit</button>
                                        <button onClick={() => handleDeleteClick(id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {index !== addresses.length - 1 && <hr />}
                    </React.Fragment>
                )
            })}
            {deleteId !== null && (
                <Popup
                    deletingAddressId={deleteId}
                    onClose={colsePopup}
                />
            )}
        </section>
    )
}

export default AddressList;