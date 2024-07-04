import { useState } from "react";
import "../../Form.css";
import "../../Button.css";
import "./AddProduct.css";
import axios from "axios";
import { useAuth } from "../../../../store/context/auth";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {
    const { AuthorizationToken } = useAuth();
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

    const handaleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const handleImageChange = (index, value) => {
        // console.log(value);
        const newImages = input.images.map((image, i) =>
            i === index ? value : image
        );
        setInput({
            ...input,
            images: newImages,
        });
    };

    const addImageField = () => {
        setInput({
            ...input,
            images: [...input.images, ""],
        });
    };

    const deleteImageField = (index) => {
        setInput({
            ...input,
            images: input.images.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const addProduct = async () => {
            try {
                const addProductURL = import.meta.env.VITE_ADD_PRODUCT;
                const response = await axios.post(addProductURL, input, {
                    headers: {
                        Authorization: AuthorizationToken
                    }
                })
                // console.log(response);
                if (response.status === 201) {
                    navigate('/admin/products');
                }
            } catch (error) {
                console.error(error);
            }
        }
        addProduct();
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
                            required
                            name="title"
                            value={input.title}
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="description">Description :</label>
                        <input
                            type="text"
                            id="description"
                            autoComplete="off"
                            required
                            name="description"
                            value={input.description}
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="category">Category :</label>
                        <input
                            type="text"
                            id="category"
                            autoComplete="off"
                            required
                            name="category"
                            value={input.category}
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="price">Price :</label>
                        <input
                            type="number"
                            min={0}
                            id="price"
                            autoComplete="off"
                            required
                            name="price"
                            value={input.price}
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="discountPercentage">Discount Percentage :</label>
                        <input
                            type="number"
                            min={0}
                            id="discountPercentage"
                            autoComplete="off"
                            required
                            name="discountPercentage"
                            value={input.discountPercentage}
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="rating">Rating :</label>
                        <input
                            type="number"
                            min={0}
                            id="rating"
                            autoComplete="off"
                            required
                            name="rating"
                            value={input.rating}
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="stock">Stock :</label>
                        <input
                            type="number"
                            min={0}
                            id="stock"
                            autoComplete="off"
                            required
                            name="stock"
                            value={input.stock}
                            onChange={handaleChange}
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
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="warrantyInformation">Warranty Information :</label>
                        <input
                            type="text"
                            id="warrantyInformation"
                            autoComplete="off"
                            required
                            name="warrantyInformation"
                            value={input.warrantyInformation}
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="shippingInformation">Shipping Information :</label>
                        <input
                            type="text"
                            id="shippingInformation"
                            autoComplete="off"
                            required
                            name="shippingInformation"
                            value={input.shippingInformation}
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="availabilityStatus">Availability Status :</label>
                        <input
                            type="text"
                            id="availabilityStatus"
                            autoComplete="off"
                            required
                            name="availabilityStatus"
                            value={input.availabilityStatus}
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <label htmlFor="returnPolicy">Return Policy :</label>
                        <input
                            type="text"
                            id="returnPolicy"
                            autoComplete="off"
                            required
                            name="returnPolicy"
                            value={input.returnPolicy}
                            onChange={handaleChange}
                        />
                    </div>
                    <div className="form-menu">
                        <h2>Images :</h2>
                        {input.images.map((image, index) => (
                            <div className="images" key={index}>
                                <label htmlFor="imageurl">Image url :</label>
                                <input
                                    type="text"
                                    id="imageurl"
                                    autoComplete="off"
                                    required
                                    name="imageurl"
                                    value={image}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                />
                                <button
                                    className="btn delete-btn"
                                    onClick={() => deleteImageField(index)}
                                >
                                    Delete image
                                </button>
                            </div>
                        ))}
                        <button
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
                            required
                            name="thumbnail"
                            value={input.thumbnail}
                            onChange={handaleChange}
                        />
                    </div>
                    <button className="submit-btn" type="submit">
                        Submit
                    </button>
                </form>
            </section>
        </>
    );
};

export default AddProduct;
