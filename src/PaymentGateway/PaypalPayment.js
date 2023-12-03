import { PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch } from 'react-redux';
import { resetCart } from '../Cart/Redux/CartSlice';
// import React, { useEffect, useState } from 'react'

function PaypalPayment({ cartData, totalAmount }) {
    console.log("cartData:", cartData)
    console.log("total:", totalAmount)
    // const [totalAmount, setTotalAmount] = useState(0);
    const dispatch = useDispatch();
    const createOrder = () => {
        // Order is created on the server and the order id is returned   https://ecommerce-ns6o.onrender.com/payment/create-paypal-order http://localhost:4500/payment/create-paypal-order
        return fetch("http://localhost:4500/payment/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
                cartData,
                totalAmount,
                // product: {
                //     description: "Iphone 13",
                //     cost: 45550
                // }
                // cart: [
                //     {
                //         sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                //         quantity: "YOUR_PRODUCT_QUANTITY",
                //     },
                // ],
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    };
    const onApprove = (data) => {
        // Order is captured on the server and the response is returned to the browser https://ecommerce-ns6o.onrender.com/payment/capture-paypal-order http://localhost:4500/payment/capture-paypal-order
        return fetch("http://localhost:4500/payment/capture-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
            .then((response) => {
                console.log("payment successful");
                return response.json()
            })
            .then((data) => {
                console.log(data)
                console.log(data.status);
                if (data.status === "COMPLETED") {
                    alert("Order Placed Successfully!\nAmount paid completed!")
                    dispatch(resetCart());
                }
            });
    };
    return (
        <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
        />


    )
}

export default PaypalPayment