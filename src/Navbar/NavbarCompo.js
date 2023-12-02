import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { NavLink } from 'react-router-dom';

function NavbarCompo() {
    const [showsubroute, setsubroute] = useState(false);
    const [showsubsub, setsubsub] = useState(null);
    const handlesubsub = (catname) => {
        setsubroute(true);
        setsubsub(catname);
    }
    const handlesubsubleave = () => {
        setsubsub(false);
    }
    // const [loginout, setloginout] = useState(false);
    const categoryname = ["development", "business", "Finance & Accounting", "IT & Software", "Office Productivity", "Personal Development", "Teaching & Academics", "Music", "Health & Fitness", "Photography & Video", "Lifestyle", "Marketing", "Design"];
    const devcatname = ["web development", "data science", "mobile development", "programming language", "entrepreneurship", "communication", "management", "sales",
        "Accounting & Bookkeeping", "Compliance", "Cryptocurrency & Blockchain", "Economics", "Finance", "IT Certifications", "Network & Security", "Hardware", "Operating Systems & Servers",
        "Other IT & Software", "Microsoft", "Apple", "Google", "SAP", "Oracle", "Personal Transformation", "Personal Productivity", "Leadership", "Career Development", "Parenting & Relationships",
        "Engineering", "Humanities", "Math", "Science", "Online Education", "Instruments", "Music Production", "Music Fundamentals", "Vocal", "Music Techniques", "Fitness", "General Health", "Sports",
        "Nutrition & Diet", "Yoga", "Digital Photography", "Photography", "Portrait Photography", "Photography Tools", "Commercial Photography", "Arts & Crafts", "Beauty & Makeup", "Esoteric Practices",
        "Food & Beverage", "Gaming", "Digital Marketing", "Search Engine Optimization", "Social Media Marketing", "Branding", "Marketing Fundamentals", "Web Design", "Graphic Design & Illustration",
        "Design Tools", "User Experience Design", "Game Design"];
    // const buscatname = ["entrepreneurship", "communication", "management", "sales"];
    return (
        <div>
            <div className='navbar'>
                <div className='udemylogo_div'>
                    <NavLink to="/">
                        <img src='https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg' alt='not found' />
                    </NavLink>
                </div>
                <div onMouseEnter={() => { setsubroute(true) }} onMouseLeave={() => { setsubroute(false) }} className='navbar_cat'>
                    <h4 className='navbar_mainfont'>Categories</h4>
                    {showsubroute && (
                        <div className='subroute mobile'>
                            <div className='subroute1'>
                                <NavLink className="subroutenav" to={`/category/${categoryname[0]}`} onMouseEnter={() => handlesubsub(categoryname[0])} onMouseLeave={handlesubsubleave}>
                                    <h4 className='subroutename submargin'>Development</h4>
                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[0] && (
                                    <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[0]) }}>
                                        <div className='subroute2'>
                                            <NavLink className="subroutenav" to={`/category/${devcatname[0]}`}>
                                                <h4 className='subroutename submargin'>Web Development</h4>
                                                {/* <h4 className='catsymb' >&gt;</h4> */}
                                            </NavLink>
                                            <NavLink className="subroutenav" to={`/category/${devcatname[1]}`}>
                                                <h4 className='subroutename submargin'>Data Science</h4>
                                                {/* <h4 className='catsymb' >&gt;</h4> */}
                                            </NavLink>
                                        </div>
                                    </div>

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[1]}`}>
                                    <h4 className='subroutename submargin'>Business</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                <NavLink className="subroutenav" to={`/category/${categoryname[2]}`} onMouseEnter={() => handlesubsub(categoryname[2])} onMouseLeave={handlesubsubleave}>
                                    <h4 className='subroutename submargin'>Finance & Accounting</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[2] && (
                                    <div className='subsub' onMouseEnter={() => handlesubsub(categoryname[2])} >
                                        <div className='subroute2'>
                                            <NavLink className="subroutenav" to={`/category/${devcatname[0]}`}>
                                                <h4 className='subroutename submargin'>Accounting</h4>
                                                {/* <h4 className='catsymb' >&gt;</h4> */}
                                            </NavLink>
                                            <NavLink className="subroutenav" to={`/category/${categoryname[0]}/${devcatname[1]}`}>
                                                <h4 className='subroutename submargin'>Data Science</h4>
                                                {/* <h4 className='catsymb' >&gt;</h4> */}
                                            </NavLink>
                                        </div>
                                    </div>

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[3]}`}>
                                    <h4 className='subroutename submargin'>IT & Software</h4>
                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                </NavLink>
                                <NavLink className="subroutenav" to={`/category/${categoryname[4]}`}>
                                    <h4 className='subroutename submargin'>Office Productivity</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                <NavLink className="subroutenav" to={`/category/${categoryname[5]}`}>
                                    <h4 className='subroutename submargin'>Personal Development</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                <NavLink className="subroutenav" to={`/category/${categoryname[6]}`}>
                                    <h4 className='subroutename submargin'>Teaching & Academics</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                <NavLink className="subroutenav" to={`/category/${categoryname[7]}`}>
                                    <h4 className='subroutename submargin'>Music</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                <NavLink className="subroutenav" to={`/category/${categoryname[8]}`}>
                                    <h4 className='subroutename submargin'>Health & Fitness</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                <NavLink className="subroutenav" to={`/category/${categoryname[9]}`}>
                                    <h4 className='subroutename submargin'>Photography & Video</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                <NavLink className="subroutenav" to={`/category/${categoryname[10]}`}>
                                    <h4 className='subroutename submargin'>Lifestyle</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                <NavLink className="subroutenav" to={`/category/${categoryname[11]}`}>
                                    <h4 className='subroutename submargin'>Marketing</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                <NavLink className="subroutenav" to={`/category/${categoryname[12]}`}>
                                    <h4 className='subroutename submargin'>Design</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
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
        </div >
    )
}

export default NavbarCompo