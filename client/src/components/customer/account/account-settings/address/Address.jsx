import React, { useState } from "react";
import "../../Account.css";
import "./Address.css";
import AddAddress from "./add/AddAddress";
import AddressList from "./address-list/AddressList";

const Address = () => {
    const [isAddAddressFormVisible, setAddAddressFormVisible] = useState(false);
    const [editId, setEditId] = useState(null);

    return (
        <section className="account-container address-container">
            <h2>Manage Address</h2>
            <AddAddress
                isAddAddressFormVisible={isAddAddressFormVisible}
                setAddAddressFormVisible={setAddAddressFormVisible}
                setEditId={setEditId}
            />
            <AddressList
                editId={editId}
                setEditId={setEditId}
                setAddAddressFormVisible={setAddAddressFormVisible}
            />
        </section>
    )
}

export default Address;