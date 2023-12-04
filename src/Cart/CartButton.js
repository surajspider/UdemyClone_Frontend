import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { addtocart } from './Redux/CartSlice';
import axios from 'axios';

function CartButton({ item }) {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const addtocartfun = () => {
        console.log(item);
        if (token) {
            axios.get("https://udemyclone-backend.onrender.com/api/auth", { headers: { "authorization": `Bearer ${token}` } }) //https://udemyclone-backend.onrender.com/api/auth http://localhost:4500/api/auth
                .then((res) => {
                    console.log(res.data);
                    console.log("item:", item);
                    dispatch(addtocart(item));
                })
                .catch(err => console.log(err))
        }
        else {
            alert("Please Login to add the item into cart!");
            navi("/login");
        }
    }
    return (
        <div>
            <button className='addtocart' onClick={() => addtocartfun()}>Add to Cart</button>
        </div>
    )
}

export default CartButton