import "./Cart.css";

const Cart = () => {
    return (
        <>
            <div className="cart-price-container">
                <div className="cart-container">
                    <div className="image-container">
                    {/* <img src="" alt="" /> */}
                    </div>
                    <div className="description-container">
                        <div className="price"></div>
                        <div className="details"></div>
                    </div>
                    <div className="cart-operation-container">
                        <div className="increment-decrement"></div>
                        <div className="remove-save"></div>
                    </div>
                </div>
                <div className="price-container">
                    <h4></h4>
                    <div></div>
                </div>
            </div>
        </>
    );
}

export default Cart