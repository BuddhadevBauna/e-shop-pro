import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../store/context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddAndUpdateAndViewForm from "../add-and-update-and-view/AddAndUpdateAndViewForm";

const AddProduct = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        description: "",
        category: "",
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: "",
        warrantyInformation: "",
        shippingInformation: "",
        availabilityStatus: "",
        returnPolicy: "",
        images: [""],
        thumbnail: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const addProduct = async () => {
            try {
                const addProductURL = import.meta.env.VITE_ADD_PRODUCT;
                const response = await axios.post(addProductURL, input, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                // console.log(response);
                if (response.status === 201) {
                    toast.success(response?.data?.message);
                    navigate('/admin/products');
                }
            } catch (error) {
                // console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
        addProduct();
    }

    return (
        <AddAndUpdateAndViewForm
            mode="Add"
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
        />
    );
};

export default AddProduct;
