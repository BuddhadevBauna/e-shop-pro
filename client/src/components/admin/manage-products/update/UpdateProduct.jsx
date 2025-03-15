import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../store/context/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddAndUpdateAndViewForm from "../add-and-update-and-view/AddAndUpdateAndViewForm";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProduct } from "../../../../api/products/productsAPI";
import { removeSingleProduct } from "../../../../store/redux/reducers/singleProductSlice";

const UpdateProduct = () => {
    const selectedProduct = useSelector(state => state.singleProduct);
    const pathParts = window.location.pathname.split("/");
    const endpoint = pathParts[pathParts.length - 1];
    const { productId } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        title: "",
        description: "",
        category: "",
        mrp: 0,
        discountPercentage: 0,
        stock: 0,
        brand: "",
        warrantyInformation: "",
        shippingInformation: "",
        returnPolicy: "",
        images: [""],
        thumbnail: "",
    });
    const [initialInput, setInitialInput] = useState(null);

    useFetchProduct(productId);

    useEffect(() => {
        if (selectedProduct) {
            const { _id, __v, reviews, ...filteredProduct } = selectedProduct;
            const updatedInput = {
                ...input,
                ...filteredProduct,
                category: selectedProduct.category?.name,
            };
            setInput(updatedInput);
            setInitialInput(updatedInput);
        }
    }, [selectedProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const upadatedFeilds = Object.fromEntries(Object.entries(input).filter(([key, value]) => {
            return value !== initialInput[key];
        }));
        // console.log(upadatedFeilds);
        const updateProduct = async () => {
            try {
                const updateProductURL = import.meta.env.VITE_UPDATE_PRODUCT + '/' + productId;
                const response = await axios.patch(updateProductURL, upadatedFeilds, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                // console.log(response);
                if (response.status === 200) {
                    toast.success(response?.data?.message);
                    dispatch(removeSingleProduct());
                    navigate('/admin/products');
                }
            } catch (error) {
                // console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
        updateProduct();
    }

    return (
        <AddAndUpdateAndViewForm
            mode={endpoint === "view" ? "View" : "Update"}
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
        />
    );
};

export default UpdateProduct;