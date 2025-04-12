import React, { useEffect } from "react";
import "./Popup.css";
import deleteAddress from "./delete-address";
import { useAuth } from "../../../../../../store/context/auth-context";
import { useAddress } from "../../../../../../store/context/address-context";

const Popup = ({ deletingAddressId, onClose }) => {
    const { loginUserData } = useAuth();
    const {getAddress} = useAddress();

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, []);

    const confirmDelete = async () => {
        await deleteAddress(loginUserData, deletingAddressId, getAddress);
        onClose();
    }

    return (
        <div className="overlay">
            <div className="popup">
                <p>Are you sure you want to delete this address?</p>
                <button className="delete-btn" onClick={confirmDelete}>YES, DELETE</button>
                <button className="cancel-btn" onClick={onClose}>CANCEL</button>
            </div>
        </div>
    )
}

export default Popup;