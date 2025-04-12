import React, { useCallback, useRef } from "react";
import "./AddressForm.css";
import axios from "axios";
import { useAuth } from "../../../../../../store/context/auth-context";
import { toast } from "react-toastify";
import { useAddress } from "../../../../../../store/context/address-context";

const stateCityData = {
    "West Bengal": ["Kolkata", "Howrah", "Kharagpur", "Midnapore"],
};

const AddressForm = ({ mode, address, setAddress, onClose }) => {
    const { loginUserData, isLoadingUserData } = useAuth();
    const {getAddress} = useAddress();
    const userId = loginUserData?.extraUserData?.id;
    const initialAddressRef = useRef(address);

    const handleChange = useCallback((e) => {
        setAddress((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }));
    },[]);

    const getModifiedFields = (initialAddress, updatedAddress) => {
        return Object.fromEntries(
            Object.entries(updatedAddress).filter(([key, value]) => value !== initialAddress[key])
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === "add") {
            const data = { ...address, user: userId };
            try {
                const response = await axios.post('http://localhost:3030/addresses/add', data, { withCredentials: true });
                if (response.status >= 200 && response.status <= 300) {
                    setAddress(initialAddressRef.current);
                    toast.success(response?.data?.message);
                    await getAddress(userId);
                    onClose();
                }
            } catch (error) {
                // console.error(error);
                toast.error(error?.response?.data?.message);
            }
        } else if (mode === "edit") {
            let { _id: addressId, ...updatedAddress } = address;
            const modifiedData = getModifiedFields(initialAddressRef.current, updatedAddress);
            // console.log(modifiedData);
            if (Object.keys(modifiedData).length === 0) {
                toast.info("No changes detected.");
                return;
            }
            try {
                const response = await axios.patch(`http://localhost:3030/addresses/edit?userId=${userId}&addressId=${addressId}`, modifiedData, { withCredentials: true });
                if (response.status >= 200 && response.status <= 300) {
                    toast.success(response?.data?.message);
                    await getAddress(userId);
                    onClose();
                }
            } catch (error) {
                // console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
    };
    
    return (
        <div className="container address-form-container">
            <h2>{mode === "add" ? 'Add New Address' : 'Edit Address'}</h2>
            <form onSubmit={handleSubmit} className="address-form">
                {["fullName", "phone", "pincode", "locality"].map((field) => (
                    <div className="input-group" key={field}>
                        <input
                            id={field}
                            type={field === "phone" ? "tel" : "text"}
                            name={field}
                            value={address[field]}
                            onChange={handleChange}
                            required
                            minLength={field === "phone" ? 10 : field === "pincode" ? 6 : 4}
                            maxLength={field === "phone" ? 10 : field === "pincode" ? 6 : 255}
                            autoComplete="new-password"
                            placeholder=""
                        />
                        <label htmlFor={field}>
                            {field === "phone" ? "10 digit phone number" : field.replace(/^\w/, (c) => c.toUpperCase())}
                        </label>
                    </div>
                ))}
                <div className="input-group textarea-group">
                    <textarea
                        id="street"
                        name="street"
                        value={address.street}
                        onChange={handleChange}
                        required
                        minLength={4}
                        maxLength={500}
                        autoComplete="new-password"
                        placeholder=""
                    ></textarea>
                    <label htmlFor="street">Address (Area & Street)</label>
                </div>
                <div className="input-group">
                    <label htmlFor="state"></label>
                    <select id="state" name="state" value={address.state} onChange={handleChange} required >
                        <option value="" disabled>Select State</option>
                        {Object.keys(stateCityData).map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="city"></label>
                    <select
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        required
                        disabled={!stateCityData[address.state]}
                    >
                        <option value="" disabled>Select City</option>
                        {address.state && stateCityData[address.state].map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="radio-group">
                    <p>Address Type</p>
                    {["Home", "Work", "Other"].map((type) => (
                        <React.Fragment key={type}>
                            <input
                                type="radio"
                                name="addressType"
                                value={type}
                                id={type}
                                checked={address.addressType === type}
                                onChange={handleChange}
                            />
                            <label htmlFor={type} className="radio-label">
                                {type}
                            </label>
                        </React.Fragment>
                    ))}
                </div>
                <div className="button-group">
                    <button type="submit" className="btn save-btn">Save</button>
                    <button type="button" className="btn cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;