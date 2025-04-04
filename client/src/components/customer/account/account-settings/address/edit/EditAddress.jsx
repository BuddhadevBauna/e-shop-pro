import { useState } from "react";
import "./EditAddress.css";
import AddressForm from "../address-form/AddressForm";

const EditAddress = ({ userAddress, setEditId }) => {
    const [address, setAddress] = useState({
        _id: userAddress._id,
        fullName: userAddress.fullName,
        phone: userAddress.phone,
        pincode: userAddress.pincode,
        locality: userAddress.locality,
        street: userAddress.street,
        city: userAddress.city,
        state: userAddress.state,
        addressType: userAddress.addressType
    });

    const onClose = () => {
        setEditId(null);
    }

    return (
        <section className="edit-address-container">
            <AddressForm
                mode="edit"
                address={address}
                setAddress={setAddress}
                onClose={onClose}
            />
        </section>
    );
}

export default EditAddress;