import axios from "axios";
import { toast } from "react-toastify";

const createOrder = async (orderData, navigate) => {
    // console.log(orderData);
    try {
        const response = await axios.post(`http://localhost:3030/orders/create`, orderData, { withCredentials: true });
        if (response.status >= 200 && response.status <= 300) {
            toast.success(response?.data?.message);
            navigate('/place-order');
        }
    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message);
    }
}

export default createOrder;