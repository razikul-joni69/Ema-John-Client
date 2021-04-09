import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    addToDatabaseCart,
    getDatabaseCart,
} from "../../../utilities/databaseManager";
import Cart from "../../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://intense-peak-67104.herokuapp.com/products')
        .then((response) => response.json())
        .then(data => setProducts(data))
    },[])
    useEffect(() => {
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

    const addProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter((pd) => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    };

    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {products.map((product) => (
                        <Product
                            key={product.key}
                            showAddToCart={true}
                            addProduct={addProduct}
                            product={product}
                        ></Product>
                    ))}
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/order">
                        <button className="cart-btn">Show Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
