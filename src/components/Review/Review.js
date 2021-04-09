import React, { useEffect, useState } from "react";
import {
    getDatabaseCart,
    processOrder,
    removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Review.css";
import happyImage from '../../images/giphy.gif';
import { useHistory } from "react-router";

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced , setOrderPlaced] = useState(false);
    const history = useHistory();

    const procedCheckout = () => {
        history.push('/shipment');
    };

    const removeProduct = (productKey) => {
        const newCart = cart.filter((pd) => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };
    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://intense-peak-67104.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then((response) => response.json())
        .then(data => setCart(data))
    }, []);

    let thankyou;
    if(orderPlaced) {
        thankyou = <img src={happyImage} alt={"description"}></img>
    }
    return (
        <div className="review-container">
            <div className="review-items">
                {cart.map((pd) => (
                    <ReviewItem
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd}
                    ></ReviewItem>
                ))}
                {
                    thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={procedCheckout} className="cart-btn">
                        Proced CheckOut
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
