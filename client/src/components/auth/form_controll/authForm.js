import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { cartChannel } from "../../../store/context/cartUpdateChannel";
import { useAuth } from "../../../store/context/auth-context";

const authForm = (initialState, requestMethod, url, formType = "") => {
    const [values, setValues] = useState(initialState);
    const navigate = useNavigate();
    const {fetchLoggedinUserData} = useAuth();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: requestMethod.toLowerCase(),
                url: url,
                data: values,
                headers: {"Content-Type": 'application/json'},
                withCredentials: true //This ensures cookies are sent/received
            });
            // console.log(response);
            if(response.status >= 200 && response.status <= 300) {
                toast.success(response.data.message);
                setValues(initialState);
                if(formType === "register") {
                    navigate('/account/login');
                } else if(formType === "login") {
                    if(!response.data.data) {
                        await fetchLoggedinUserData();
                        cartChannel.postMessage({ type: "LOGIN" });
                        navigate('/');
                    } else {
                        const token = response.data.data.token;
                        navigate(`/account/verify/${token}`, {
                            state: {
                                email: response?.data?.data?.email,
                                phone: response?.data?.data?.phone,
                            }
                        });
                    }
                } else if(formType === "resetPassword") {
                    navigate('/account/login');
                }
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }

    return {values, handleChange, handleSubmit};
}

export default authForm;