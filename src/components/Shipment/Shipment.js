import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()}

        fetch('https://intense-peak-67104.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(data => {
            processOrder();
            alert('order Placed Successfully')
        })

    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={loggedInUser.name} ref={register} placeholder="Enter Your Name"/>
            <input name="email" defaultValue={loggedInUser.email} ref={register} placeholder="Enter Your Email"/>
            <input name="address" defaultValue={loggedInUser.address} ref={register} placeholder="Enter Your Address"/>

            <input name="phone" ref={register({ required: true })} placeholder="Enter Your Phone Number"/>
            {errors.exampleRequired && <span>This field is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;
