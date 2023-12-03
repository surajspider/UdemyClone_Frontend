import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Compo/Footer';

function CartPage() {
    const navi = useNavigate();
    const navigate = () => {
        navi("/");
    }
    return (
        <div>
            <div className='cartmain_div'>
                <h1 style={{ textAlign: "left", fontSize: "2.4em" }}>Shopping Cart</h1>
                <h4 style={{ textAlign: "left" }}>0 Courses in Cart</h4>
                <div className='noitemscart_div'>
                    <div className='noitemsimage'>
                        <img src='https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2.jpg' alt='not found' className='imgfil' />
                    </div>
                    <p>Your Cart is empty. Keep shopping to find a course!</p>
                    <button className='keepshopping' onClick={navigate}>Keep shopping</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CartPage