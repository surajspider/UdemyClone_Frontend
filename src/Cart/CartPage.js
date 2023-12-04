import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Compo/Footer';
import { useDispatch, useSelector } from 'react-redux';
import RatingStars from '../Compo/RatingStars';
import { deleteItem } from './Redux/CartSlice';
import PaypalPayment from '../PaymentGateway/PaypalPayment';
import axios from 'axios';

function CartPage() {
    const [toggle, setToggle] = useState(false);
    const navi = useNavigate();
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const itemsInCart = useSelector((state) => state.cart.itemsInCart);
    const totalAmt = useSelector((state) => state.cart.totalAmount);
    const navigate = () => {
        navi("/");
    }
    const handleDelete = (item) => {
        dispatch(deleteItem(item));
    }
    const buynow = () => {
        alert("Proceed to Payment!");
        setToggle(!toggle);
    }
    useEffect(() => {
        if (token) {
            axios.get("https://udemyclone-backend.onrender.com/api/auth", { headers: { "authorization": `Bearer ${token}` } }) //https://udemyclone-backend.onrender.com/api/auth  http://localhost:4500/api/auth
                .then((res) => {
                    console.log(res.data);
                })
                .catch(err => console.log(err))
        }
        else {
            alert("Please login to view cart page!");
            navi("/login");
        }
    }, [token, navi])
    return (
        <div>
            <div className='cartmain_div'>
                <h1 style={{ textAlign: "left", fontSize: "2.4em" }}>Shopping Cart</h1>
                <h4 style={{ textAlign: "left", marginBottom: "2vh" }}>{itemsInCart.length} Course{itemsInCart.length > 1 && (<span>s</span>)} in Cart</h4>
                {itemsInCart.length > 0 ? (
                    <div>
                        <hr />
                        <div className='cartparent_div'>

                            <div className='cartitems_div'>
                                {itemsInCart.map((item, index) => {
                                    return (
                                        <div>
                                            <div className='eachcartitem' key={index}>
                                                <div className='cartitem_imgdiv'>
                                                    <img src={item.image} className='imgfil' alt="not found" />
                                                </div>
                                                <div className='cartitem_contentdiv'>
                                                    <h4 className='padd'>{item.courseName}</h4>
                                                    <p className='padd'>By {item.creator}</p>
                                                    <div className='rating_div'>{item.rating}<div><RatingStars rating={item.rating} /></div>(3256)</div>
                                                    <p className='padd'>{item.hrs} total hours . {item.lectures} lectures . All levels</p>
                                                </div>
                                                <div className='remove_div'>
                                                    <p style={{ color: "blueviolet", textDecoration: "underline", cursor: "pointer" }} onClick={() => handleDelete(item)}>Remove</p>
                                                </div>
                                                <div className='courseamt_div'>
                                                    <h3>₹{item.offerPrice}</h3>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='totaldiv'>
                                <h3>Total:</h3>
                                <h1>₹{totalAmt}</h1>
                                {!toggle ? <button onClick={buynow} className='checkout_but'>Checkout</button> : ""}
                                {toggle ? <PaypalPayment cartData={itemsInCart} totalAmount={totalAmt} /> : ""}
                                <hr />
                                <h4>Promotions</h4>
                                <input type='text' className='coupontext' placeholder='Enter Coupon' />
                                <button className='couponapply'>Apply</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='noitemscart_div'>
                        <div className='noitemsimage'>
                            <img src='https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2.jpg' alt='not found' className='imgfil' />
                        </div>
                        <p>Your Cart is empty. Keep shopping to find a course!</p>
                        <button className='keepshopping' onClick={navigate}>Keep shopping</button>
                    </div>
                )}

            </div>
            <Footer />
        </div>
    )
}

export default CartPage