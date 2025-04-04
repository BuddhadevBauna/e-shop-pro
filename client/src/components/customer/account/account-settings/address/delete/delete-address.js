import { toast } from "react-toastify";
import axios from "axios";

const deleteAddress = async (token, loginUserData, addressId, getAddress) => {
    const userId = loginUserData?.extraUserData?.id;
    try {
        const response = await axios.delete(`http://localhost:3030/addresses/delete?userId=${userId}&addressId=${addressId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status >= 200 && response.status <= 300) {
            toast.success(response?.data?.message);
            await getAddress();
        }
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
}

export default deleteAddress;