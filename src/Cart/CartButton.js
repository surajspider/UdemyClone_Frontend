import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { addtocart } from './Redux/CartSlice';

function CartButton({ item }) {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const addtocartfun = () => {
        console.log(item);
        dispatch(addtocart(item));
        navi("/cart");
    }
    return (
        <div>
            <button className='addtocart' onClick={() => addtocartfun()}>Add to Cart</button>
        </div>
    )
}

export default CartButton