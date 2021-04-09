import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
    const { img, name, seller, stock, price, key } = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-description">
                <h2 className="product-name">
                    <Link to={"/product/" + key}>{name}</Link>{" "}
                </h2>
                <h5>By: {seller}</h5>
                <h4>Price : {price}</h4>
                <h5>Only {stock} available - Order soon</h5>
                { props.showAddToCart && <button
                    onClick={() => props.addProduct(props.product)}
                    className="cart-btn"
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;
