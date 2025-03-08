import "../../Form.css";
import "../../Button.css";
import "./AddAndUpdateAndViewForm.css";
import CustomInput from "../input/custom/CustomInput";
import ImageInput from "../input/image/ImageInput";
import CategoryInput from "../input/category/CategoryInput";
import TextAreaInput from "../input/textarea/TextAreaInput";

const AddAndUpdateAndViewForm = ({ mode, input, setInput, onSubmit }) => {
    return (
        <>
            <section className={`section-container ${mode === "View" ? "section-view-container" : ""}`}>
                {(mode === "Add" || mode === "Update") &&
                    <div className="section-header">
                        <h1>{mode} Product</h1>
                    </div>
                }
                <form onSubmit={onSubmit}>
                    <CustomInput
                        label="Title"
                        type="text"
                        required={true}
                        name="title"
                        value={input.title}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                    />
                    <TextAreaInput 
                        label="Description"
                        required={true}
                        name="description"
                        value={input.description}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                    />
                    <CategoryInput
                        label="Category"
                        type="text"
                        required={true}
                        name="category"
                        value={input.category}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                    />
                    <CustomInput
                        label="Price"
                        type="number"
                        required={true}
                        name="price"
                        value={input.price}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                        min={0}
                        step={0.01}
                    />
                    <CustomInput
                        label="Discount Percentage"
                        type="number"
                        required={true}
                        name="discountPercentage"
                        value={input.discountPercentage}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                        min={0}
                        max={100}
                        step={0.01}
                    />
                    <CustomInput
                        label="Rating"
                        type="number"
                        required={true}
                        name="rating"
                        value={input.rating}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                        min={0}
                        max={5}
                        step={0.01}
                    />
                    <CustomInput
                        label="Stock"
                        type="number"
                        required={true}
                        name="stock"
                        value={input.stock}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                        min={0}
                    />
                    <CustomInput
                        label="Brand"
                        type="text"
                        required={false}
                        name="brand"
                        value={input.brand}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                    />
                    <CustomInput
                        label="Warranty Information"
                        type="text"
                        required={true}
                        name="warrantyInformation"
                        value={input.warrantyInformation}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                    />
                    <CustomInput
                        label="Shipping Information"
                        type="text"
                        required={true}
                        name="shippingInformation"
                        value={input.shippingInformation}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                    />
                    <CustomInput
                        label="Availability Status"
                        type="text"
                        required={true}
                        name="availabilityStatus"
                        value={input.availabilityStatus}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                    />
                    <CustomInput
                        label="Return Policy"
                        type="text"
                        required={true}
                        name="returnPolicy"
                        value={input.returnPolicy}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                    />
                    <ImageInput
                        heading="Images"
                        label="Image url"
                        type="text"
                        required={true}
                        name="imageurl"
                        mode={mode}
                        input={input}
                        setInput={setInput}
                    />
                    <CustomInput
                        label="Thumbnail"
                        type="text"
                        required={true}
                        name="thumbnail"
                        value={input.thumbnail}
                        mode={mode}
                        input={input}
                        setInput={setInput}
                    />
                    {(mode === "Add" || mode === "Update") &&
                        <button className="submit-btn" type="submit">
                            Submit
                        </button>
                    }
                </form>
            </section>
        </>
    );
};

export default AddAndUpdateAndViewForm;