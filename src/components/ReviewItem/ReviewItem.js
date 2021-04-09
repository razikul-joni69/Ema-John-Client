import React from "react";

const ReviewItem = (props) => {
    const { name, quantity, key, price } = props.product;
    return (
        <div>
            <h2 className="product-name">{name}</h2>
            <p>Quantity: {quantity}</p>
            <p>Price: ${price}</p>
            <button
                onClick={() => props.removeProduct(key)}
                className="cart-btn"
            >
                Remove
            </button>
        </div>
    );
};

export default ReviewItem;
