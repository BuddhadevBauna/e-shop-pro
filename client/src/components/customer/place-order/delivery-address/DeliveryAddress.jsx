import React, { useEffect, useState } from "react";
import "./DeliveryAddress.css";
import { useAuth } from "../../../../store/context/auth-context";
import { FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import AddAddress from "../../account/account-settings/address/add/AddAddress";
import { useAddress } from "../../../../store/context/address-context";

const DeliveryAddress = ({ activeSection, setActiveSection }) => {
    const { isLoadingUserData, loginUserData } = useAuth();
    const userId = loginUserData?.extraUserData?.id;
    const { getRecentAddress, addresses } = useAddress();
    const [isAddAddressFormVisible, setAddAddressFormVisible] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (!isLoadingUserData && userId) {
                await getRecentAddress(userId);
            }
        }
        getData();
    }, [isLoadingUserData, userId]);

    const changeDefaultAddress = async (addressId) => {
        try {
            const response = await axios.patch(`http://localhost:3030/addresses/change-default?userId=${userId}&addressId=${addressId}`, {}, { withCredentials: true });
            if (response.status >= 200 && response.status <= 300) {
                toast.success(response?.data?.message);
                await getRecentAddress(userId);
            }
        } catch (error) {
            // console.error(error);
            toast.error(error?.response?.data?.message);
        }
    }

    const handleChange = () => {
        setActiveSection(["deliveryAddress", 2]);
    }

    const handleClick = () => {
        setActiveSection(["orderSummery", 3]);
    }

    return (
        <>
            <div className={`placeorder-item delivery-address-container ${!activeSection.includes("deliveryAddress") ? "not-active" : ""}`}>
                <h2>
                    <span>2</span>
                    <span>Delivery Address</span>
                    {activeSection[1] > 2 && <i><FiCheck /></i>}
                </h2>
                {activeSection.includes("deliveryAddress") && (
                    <div className="address-list">
                        {addresses.map(address => {
                            const { _id, addressType, fullName, phone, street, locality, city, state, pincode, isDefault } = address;
                            return (
                                <div key={_id} className="address-item">
                                    <div className="address-content">
                                        <input
                                            type="radio"
                                            name="selectedAddress"
                                            value={_id}
                                            checked={isDefault}
                                            onChange={() => changeDefaultAddress(_id)}
                                        />
                                        <div className="details-container">
                                            <p className="information">
                                                <span>{addressType}</span>
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
                                    </div>
                                    {isDefault && <button className="delivery-btn" onClick={handleClick}>Delivery Here</button>}
                                </div>
                            )
                        })}
                    </div>
                )}
                {activeSection[1] > 2 && <button className="change-btn" onClick={handleChange}>Change</button>}
            </div>
            {activeSection.includes("deliveryAddress") &&
                <div className="delivery-address-add-container">
                    <AddAddress
                        calledFrom="deliveryAddress"
                        isAddAddressFormVisible={isAddAddressFormVisible}
                        setAddAddressFormVisible={setAddAddressFormVisible}
                    />
                </div>
            }
        </>
    );
}

export default DeliveryAddress;