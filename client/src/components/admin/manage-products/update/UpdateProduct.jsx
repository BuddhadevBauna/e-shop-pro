import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchProduct } from "../../../../api/products/productsAPI";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useAuth } from "../../../../store/context/auth";
import { removeSingleProduct } from "../../../../store/redux/reducers/singleProductSlice";

const UpdateProduct = () => {
    const selectedProduct = useSelector(state => state.singleProduct);
    // console.log(selectedProduct);

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

    const {productId} = useParams();
    // console.log(productId);
    const {AuthorizationToken} = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //call custom hook
    useFetchProduct(productId);

    useEffect(() => {
        if(selectedProduct) {
            setInput({
                ...input, 
                ...selectedProduct
            });
        }
    }, [selectedProduct])

    const handleChange = (e) => {
        const {name, value} = e.target;
        // console.log(name, value);
        setInput({
            ...input,
            [name]: value
        })
    }

    const handleImageChange = (index, value) => {
        const updatedImages = input.images.map((image, i) => i === index ? value : image);
        setInput({
            ...input,
            images: updatedImages
        })
    }

    const addImageField = () => {
        setInput({
            ...input,
            images: [...input.images, ""]
        })
    }

    const deleteImageField = (index) => {
        const newImages = input.images.filter((_, i) => i !== index);
        setInput({
            ...input,
            images: newImages
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateProduct = async () => {
            const updateProductURL = import.meta.env.VITE_UPDATE_PRODUCT+'/'+productId;
            try {
                const response = await axios.patch(updateProductURL, input, {
                    headers: {
                        Authorization: AuthorizationToken
                    }
                })
                // console.log(response);
                if (response.status === 200) {
                    dispatch(removeSingleProduct());
                    navigate('/admin/products');
                }
            } catch (error) {
                console.error(error);
            }
        }
        updateProduct();
    }

    return (
        <>
            <section className="section-container">
                <div className="section-header">
                    <h1>Add Product</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-menu">
                        <label htmlFor="title">Title :</label>
                        <input
                            type="text"
                            id="title"
                            autoComplete="off"
                            name="title"
                            value={input.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="description">Description :</label>
                        <input
                            type="text"
                            id="description"
                            autoComplete="off"
                            name="description"
                            value={input.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="category">Category :</label>
                        <input
                            type="text"
                            id="category"
                            autoComplete="off"
                            name="category"
                            value={input.category}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="price">Price :</label>
                        <input
                            type="number"
                            min={0}
                            id="price"
                            autoComplete="off"
                            name="price"
                            value={input.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="discountPercentage">Discount Percentage :</label>
                        <input
                            type="number"
                            min={0}
                            id="discountPercentage"
                            autoComplete="off"
                            name="discountPercentage"
                            value={input.discountPercentage}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="rating">Rating :</label>
                        <input
                            type="number"
                            min={0}
                            id="rating"
                            autoComplete="off"
                            name="rating"
                            value={input.rating}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="stock">Stock :</label>
                        <input
                            type="number"
                            min={0}
                            id="stock"
                            autoComplete="off"
                            name="stock"
                            value={input.stock}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="brand">Brand :</label>
                        <input
                            type="text"
                            id="brand"
                            autoComplete="off"
                            name="brand"
                            value={input.brand}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="warrantyInformation">Warranty Information :</label>
                        <input
                            type="text"
                            id="warrantyInformation"
                            autoComplete="off"
                            name="warrantyInformation"
                            value={input.warrantyInformation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="shippingInformation">Shipping Information :</label>
                        <input
                            type="text"
                            id="shippingInformation"
                            autoComplete="off"
                            name="shippingInformation"
                            value={input.shippingInformation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="availabilityStatus">Availability Status :</label>
                        <input
                            type="text"
                            id="availabilityStatus"
                            autoComplete="off"
                            name="availabilityStatus"
                            value={input.availabilityStatus}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="returnPolicy">Return Policy :</label>
                        <input
                            type="text"
                            id="returnPolicy"
                            autoComplete="off"
                            name="returnPolicy"
                            value={input.returnPolicy}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <h2>Images :</h2>
                        {input.images.map((image, index) => (
                            <div className="images" key={index}>
                                <label htmlFor={`imageurl-${index}`}>Image url :</label>
                                <input
                                    type="text"
                                    id={`imageurl-${index}`}
                                    autoComplete="off"
                                    name="imageurl"
                                    value={image}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn delete-btn"
                                    onClick={() => deleteImageField(index)}
                                >
                                    Delete image
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn add-btn"
                            onClick={addImageField}
                        >
                            {input.images.length === 0 ? (
                                <small>Add image</small>
                            ) : (
                                <small>Add more image</small>
                            )}
                        </button>
                    </div>
                    <div className="form-menu">
                        <label htmlFor="thumbnail">Thumbnail :</label>
                        <input
                            type="text"
                            id="thumbnail"
                            autoComplete="off"
                            name="thumbnail"
                            value={input.thumbnail}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="submit-btn" type="submit">
                        Submit
                    </button>
                </form>
            </section>
        </>
    )
}

export default UpdateProduct;