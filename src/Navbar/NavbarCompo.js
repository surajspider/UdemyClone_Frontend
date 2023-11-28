import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdLanguage } from "react-icons/md";

function NavbarCompo() {
    return (
        <div>
            <div className='navbar'>
                <div className='udemylogo_div'>
                    <img src='https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg' alt='not found' />
                </div>
                <div className='navbar_cat'>
                    <h4 className='navbar_mainfont'>Categories</h4>
                </div>
                <div className='searchbar_div'>
                    <button><IoIosSearch size={"1.5em"} /></button>
                    <input className='searchbar' type='text' placeholder='Search for anything'></input>
                </div>
                <div className='navbar_cat'>
                    <h4 className='navbar_mainfont'>Udemy Business</h4>
                </div>
                <div className='navbar_cat'>
                    <h4 className='navbar_mainfont'>Teach on Udemy</h4>
                </div>
                <div className='navbar_cat'>
                    <MdOutlineShoppingCart size={"1.5em"} style={{ margin: "15px 0px 0px 0px" }} />
                </div>
                <div className='butdiv_nav'>
                    <div className='logbut_nav'>
                        <h5>Log in</h5>
                    </div>
                    <div className='logbut_nav signupbut'>
                        <h5>Sign up</h5>
                    </div>
                    <div className='logbut_nav'>
                        <MdLanguage size={"1.5em"} style={{ margin: "5px 0px 0px 0px" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarCompo