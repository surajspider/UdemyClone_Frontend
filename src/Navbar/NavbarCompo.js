import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { NavLink } from 'react-router-dom';

function NavbarCompo() {
    const [showsubroute, setsubroute] = useState({ mobiles: false, subsub: false });
    const [loginout, setloginout] = useState(false);
    const categoryname = ["development", "business"];
    const devcatname = ["web development", "data science", "mobile development", "programming language"];
    const buscatname = ["entrepreneurship", "communication", "management", "sales"];
    return (
        <div>
            <div className='navbar'>
                <div className='udemylogo_div'>
                    <NavLink to="/">
                        <img src='https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg' alt='not found' />
                    </NavLink>
                </div>
                <div onMouseEnter={() => setsubroute({ ...showsubroute, mobiles: true })} onMouseLeave={() => { setsubroute({ ...showsubroute, mobiles: false }); }} className='navbar_cat'>
                    <h4 className='navbar_mainfont'>Categories</h4>
                    {showsubroute.mobiles && (
                        <div className='subroute mobile'>
                            <div className='subroute1'>
                                <NavLink className="subroutenav" to={`/category/${categoryname[0]}`} onMouseEnter={() => setsubroute({ ...showsubroute, subsub: true })} onMouseLeave={() => setsubroute({ ...showsubroute, subsub: false })}>
                                    <h4 className='subroutename submargin'>Development</h4>
                                    <h4 className='catsymb' >&gt;</h4>
                                </NavLink>
                                {showsubroute.subsub && (
                                    <div className='subsub' onMouseEnter={() => setsubroute({ ...showsubroute, subsub: true })} onMouseLeave={() => setsubroute({ ...showsubroute, subsub: false })} >
                                        <div className='subroute2'>
                                            <NavLink className="subroutenav" to={`/dynamic/`}>
                                                <h4 className='subroutename submargin'>Development</h4>
                                                <h4 className='catsymb' >&gt;</h4>
                                            </NavLink>
                                            <NavLink className="subroutenav" to={`/dynamic/`}>
                                                <h4 className='subroutename submargin'>Development</h4>
                                                <h4 className='catsymb' >&gt;</h4>
                                            </NavLink>
                                        </div>
                                    </div>

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[1]}`}>
                                    <h4 className='subroutename submargin'>Business</h4>
                                    <h4 className='catsymb'>&gt;</h4>
                                </NavLink>
                                <NavLink className="subroutenav" to={`/dynamic/`}>
                                    <h4 className='subroutename submargin'>Finance & Accounting</h4>
                                    <h4 className='catsymb'>&gt;</h4>
                                </NavLink>
                                <NavLink className="subroutenav" to={`/dynamic/`}>
                                    <h4 className='subroutename submargin'>IT & Software</h4>
                                    <h4 className='catsymb' >&gt;</h4>
                                </NavLink>
                                <NavLink className="subroutenav" to={`/dynamic/`}>
                                    <h4 className='subroutename submargin'>Office Productivity</h4>
                                    <h4 className='catsymb'>&gt;</h4>
                                </NavLink>
                                <NavLink className="subroutenav" to={`/dynamic/`}>
                                    <h4 className='subroutename submargin'>Personal Development</h4>
                                    <h4 className='catsymb'>&gt;</h4>
                                </NavLink>
                                <NavLink className="subroutenav" to={`/dynamic/`}>
                                    <h4 className='subroutename submargin'>Design</h4>
                                    <h4 className='catsymb'>&gt;</h4>
                                </NavLink>
                                <NavLink className="subroutenav" to={`/dynamic/`}>
                                    <h4 className='subroutename submargin'>Marketing</h4>
                                    <h4 className='catsymb'>&gt;</h4>
                                </NavLink>
                            </div>
                        </div>
                    )}
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
                        <NavLink style={{ color: "black", textDecoration: "none" }} to="/login">
                            <h5>Log in</h5>
                        </NavLink>
                    </div>
                    <div className='logbut_nav signupbut'>
                        <NavLink style={{ color: "white", textDecoration: "none" }} to="/register">
                            <h5>Sign up</h5>
                        </NavLink>
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