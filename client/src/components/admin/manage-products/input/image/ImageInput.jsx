import React, { useState } from "react";
import "./ImageInput.css";

const ImageInput = ({ heading, label, type, required, name, mode, input, setInput }) => {
    const [showMessage, setShowMessage] = useState(false);

    const handleImageChange = (index, value) => {
        // console.log(value);
        setInput((prevInput) => ({
            ...prevInput,
            images: prevInput.images.map((image, i) => (i === index ? value : image)),
        }));
    };

    const addImageField = () => {
        if (input.images[input.images.length - 1] === "") {
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 2000);
        } else {
            setInput((prevInput) => ({
                ...prevInput,
                images: [...prevInput.images, ""],
            }));
        }
    };
    const deleteImageField = (index) => {
        setInput((prevInput) => ({
            ...prevInput,
            images: prevInput.images.filter((_, i) => i !== index)
        })
        )
    };

    return (
        <div className="form-menu">
            <div className="category-input-container">
                <h2>{heading} :</h2>
                <div className="image-container">
                    {input.images.map((image, index) => (
                        <div className="image" key={index}>
                            <label htmlFor={`${name}-${index}`}>{label} :</label>
                            <input
                                type={type}
                                id={`${name}-${index}`}
                                autoComplete="off"
                                required={required}
                                value={image}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                            />
                            {input.images.length > 1 &&
                                <button
                                    type="button"
                                    className="btn delete-btn"
                                    onClick={() => deleteImageField(index)}
                                >
                                    Delete image
                                </button>
                            }
                        </div>
                    ))}
                </div>
                {showMessage && <p className="error-message">Please First Fill The Previous Image URL</p>}
                <button
                    type="button"
                    className="btn add-btn"
                    onClick={addImageField}
                >
                    <small>Add more image</small>
                </button>
            </div>
            {(mode === "View") &&
                <button className="submit-btn" type="submit">
                    Update
                </button>
            }
        </div>
    )
}

export default ImageInput;