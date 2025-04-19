import { useState } from "react";
import "./AddAddress.css";
import AddressForm from "../address-form/AddressForm";
import { AiOutlinePlus } from "react-icons/ai";

const AddAddress = ({ calledFrom, isAddAddressFormVisible, setAddAddressFormVisible, setEditId }) => {
    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        pincode: "",
        locality: "",
        street: "",
        city: "",
        state: "",
        addressType: "Home"
    });

    const handleAddAddressClick = () => {
        setAddAddressFormVisible(true);
        if(calledFrom === "address") {
            setEditId(null);
        }
    }
    const onClose = () => {
        setAddAddressFormVisible(false);
    }

    return (
        <section className="add-address-container">
            {!isAddAddressFormVisible ? (
                <div className="container add-address-box" onClick={handleAddAddressClick}>
                    <i className="plus-icon"><AiOutlinePlus /></i>
                    <p>Add new address</p>
                </div>
            ) : (
                <AddressForm
                    mode="add"
                    address={address}
                    setAddress={setAddress}
                    onClose={onClose}
                    calledFrom={calledFrom}
                />
            )}
        </section>
    );
}

export default AddAddress;