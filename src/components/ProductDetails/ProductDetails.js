import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Header/Product/Product";

const ProductDetails = () => {
    // const { productKey } = useParams();
    // const [product, setProduct] = useState({});

    // useEffect(() => {
    //     fetch('https://intense-peak-67104.herokuapp.com/product/'+productKey)
    //     .then((response) => response.json())
    //     .then(data => setProduct(data))
    // },[productKey])
    return (
        <div>
            <h1>{productKey} is product details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;
