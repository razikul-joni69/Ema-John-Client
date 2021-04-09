import React from "react";

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce(
        (total, prd) => total + prd.price * prd.quantity || 1,
        0
    );

    let shipping = 0;
    if (total > 55) {
        shipping = 0;
    } else if (total > 15) {
        shipping = 4.99;
    } else if (total > 0) {
        shipping = 12.99;
    }

    const tax = parseFloat((total / 10).toFixed(2));
    const grandTotal = parseFloat((total + shipping + tax).toFixed(2));
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Selected Items: {cart.length}</p>
            <p>
                <small>Tax + Vat: {tax}</small>{" "}
            </p>
            <p>
                <small>Shipping Cost: {shipping}</small>
            </p>
            <p>Total Price: {grandTotal}</p>
            {props.children}
        </div>
    );
};

export default Cart;
