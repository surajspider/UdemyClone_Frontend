import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { resetCart } from '../Cart/Redux/CartSlice';
import { FaRegHeart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";

function NavbarCompo() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [submenucat, setsubmenucat] = useState(null);
    const [showsubroute, setsubroute] = useState(false);
    const [showlogroute, setlogroute] = useState(false);
    const [showsubsub, setsubsub] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isLoggedIn, setlogged] = useState(false);
    const [userinfo, setUserInfo] = useState(null);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const itemsInCart = useSelector((state) => state.cart.itemsInCart);
    const navi = useNavigate();
    const handlesubmenu = (catname) => {
        setsubmenucat(catname);
    }
    const handlesubmenuback = () => {
        setsubmenucat(null);
    }
    const handlesubsub = (catname) => {
        setsubroute(true);
        setsubsub(catname);
    }
    const handlesubsubleave = () => {
        setsubsub(false);
    }
    const handleInput = (e) => {
        const value = e.target.value;
        setSearchText(value);
    };
    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://udemyclone-backend.onrender.com/data/search?searchText=${searchText}`); //https://udemyclone-backend.onrender.com/data/search?searchText=${searchText} http://localhost:4500/data/search?searchText=${searchText}
            const searchResult = response.data;
            console.log(response.data);
            console.log(searchResult.length);
            if (searchResult.length === 0) {
                alert("Results not found!");
                setSearchText("");
                navi("/");
            }
            else {
                navi("/search", { state: { searchResult, searchText } });
                setSearchText("");
            }
        }
        catch (err) {
            console.log("Error searching:", err);
        }
    }
    const logoutfun = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        setlogged(false);
        setUserInfo(null);
        dispatch(resetCart());
        navi("/");
    }
    useEffect(() => {
        if (token) {
            axios.get("https://udemyclone-backend.onrender.com/api/auth", { headers: { "authorization": `Bearer ${token}` } }) //https://udemyclone-backend.onrender.com/api/auth http://localhost:4500/api/auth
                .then((res) => {
                    console.log(res.data.msg);
                    console.log(res.data.userdata);
                    if (res.data.msg === "User Authorized") {
                        setlogged(true);
                        localStorage.setItem("userID", res.data.userdata.email);
                        setUserInfo(res.data.userdata);
                        setlogroute(false);
                    }
                })
                .catch(err => console.log(err))
        }
    }, [token])
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
        //  onClick = {() => handlesubmenu(categoryname[7])}
        //  onClick = {() => setMobileMenuOpen(!isMobileMenuOpen)}
        <div>
            <div className='navbar'>
                <div className='mobileview menuicon_div' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                    <IoMenu size={"2.5em"} />
                </div>
                {isMobileMenuOpen && (
                    <div className={`mobileview menupage`}>
                        {isLoggedIn ? (
                            <div>
                                <h4>Hello, {userinfo.uname}</h4>
                                <h4 onClick={logoutfun}>Logout</h4>
                            </div>
                        ) : (
                            <div>
                                <h4><NavLink className="navlinkmenu" to={"/login"} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Login</NavLink></h4>
                                <h4><NavLink className="navlinkmenu" to={"/register"} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Sign up</NavLink></h4>
                            </div>
                        )}

                        <hr></hr>
                        <h4>All Categories</h4>
                        <hr></hr>
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[0])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[0]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Development</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[0] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[0]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[0]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>web development</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[1]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>data science</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[2]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>mobile development</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[3]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>programming language</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[1])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[1]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Business</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[1] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[1]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[4]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>entrepreneurship</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[5]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>communication</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[6]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>management</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[7]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>sales</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[2])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[2]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Finance & Accounting</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[2] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[2]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[8]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Accounting & Bookkeeping</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[9]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Compliance</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[10]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Cryptocurrency & Blockchain</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[11]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Economics</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[12]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Finance</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[3])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[3]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>IT & Software</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[3] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[3]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[13]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>IT Certifications</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[14]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Network & Security</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[15]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Hardware</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[16]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Operating Systems & Servers</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[17]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Other IT & Software</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[4])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[4]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Office Productivity</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[4] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[4]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[18]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Microsoft</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[19]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Apple</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[20]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Google</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[21]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>SAP</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[22]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Oracle</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[5])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[5]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Personal Development</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[5] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[5]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[23]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Personal Transformation</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[24]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Personal Productivity</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[25]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Leadership</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[26]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Career Development</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[27]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Parenting & Relationships</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[6])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[6]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Teaching & Academics</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[6] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[6]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[28]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Engineering</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[29]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Humanities</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[30]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Math</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[31]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Science</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[32]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Online Education</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[7])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[7]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Music</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[7] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[7]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[33]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Instruments</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[34]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Music Production</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[35]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Music Fundamentals</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[36]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Vocal</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[37]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Music Techniques</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[8])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[8]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Health & Fitness</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[8] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[8]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[38]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Fitness</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[39]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>General Health</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[40]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Sports</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[41]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Nutrition & Diet</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[42]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Yoga</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[9])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[9]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Photography & Video</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[9] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[9]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[43]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Digital Photography</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[44]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Photography</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[45]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Portrait Photography</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[46]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Photography Tools</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[47]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Commercial Photography</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[10])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[10]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Lifestyle</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[10] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[10]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[48]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Arts & Crafts</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[49]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Beauty & Makeup</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[50]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Esoteric Practices</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[51]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Food & Beverage</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[52]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Gaming</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[11])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[11]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Marketing</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[11] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[11]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[53]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Digital Marketing</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[54]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Search Engine Optimization</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[55]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Social Media Marketing</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[56]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Branding</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[57]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Marketing Fundamentals</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='navsubmenu' onClick={() => handlesubmenu(categoryname[12])}>
                            <NavLink className="navlinkmenu" to={`/category/${categoryname[12]}`}> <p className='menuitemsgt' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>Design</p></NavLink>
                            <div className='gt'>&gt;</div>
                        </div>
                        {submenucat === categoryname[12] && (
                            <div className='submenupage'>
                                <h4 style={{ textDecoration: "underline" }} onClick={handlesubmenuback}>Back</h4>
                                <hr />
                                <h4>{categoryname[12]}</h4>
                                <hr />
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[58]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Web Design</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[59]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Graphic Design & Illustration</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[60]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Design Tools</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[61]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>User Experience Design</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                                <NavLink className="navlinkmenu" to={`/category/${devcatname[62]}`} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                    <div className='navsubmenu'>
                                        <p className='menuitemsgt'>Game Design</p>
                                        <div className='gt'>&gt;</div>
                                    </div>
                                </NavLink>
                            </div>
                        )}
                        <div className='closebutton_div' onClick={() => setMobileMenuOpen(false)}>
                            <IoCloseCircle size={"3em"} color='black' />
                        </div>
                    </div>
                )}
                <div className='udemylogo_div'>
                    <NavLink to="/">
                        <img src='https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg' alt='not found' />
                    </NavLink>
                </div>
                <div className='mobileview flexyicons'>
                    {/* <div className='navicons'>
                        <IoIosSearch size={"2em"} />
                    </div> */}
                    <div className='navicons'>
                        <NavLink className="textdeconone" to={"/cart"}>
                            <MdOutlineShoppingCart size={"2em"} />
                        </NavLink>
                    </div>
                </div>
                <div onMouseEnter={() => { setsubroute(true) }} onMouseLeave={() => { setsubroute(false) }} className='navbar_cat'>
                    <h4 className='navbar_mainfont'>Categories</h4>
                    {showsubroute && (
                        <div className='subroute mobile'>
                            <div className='subroute1'>
                                <NavLink className="subroutenav" to={`/category/${categoryname[0]}`} onMouseEnter={() => handlesubsub(categoryname[0])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Development</h4>
                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[0] && (
                                    <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[0]) }}>
                                        <div className='subroute2'>
                                            <NavLink className="subroutenav" to={`/category/${devcatname[0]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                <h4 className='subroutename submargin'>Web Development</h4>
                                                {/* <h4 className='catsymb' >&gt;</h4> */}
                                            </NavLink>
                                            <NavLink className="subroutenav" to={`/category/${devcatname[1]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                <h4 className='subroutename submargin'>Data Science</h4>
                                                {/* <h4 className='catsymb' >&gt;</h4> */}
                                            </NavLink>
                                            <NavLink className="subroutenav" to={`/category/${devcatname[2]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                <h4 className='subroutename submargin'>Mobile Development</h4>
                                                {/* <h4 className='catsymb' >&gt;</h4> */}
                                            </NavLink>
                                            <NavLink className="subroutenav" to={`/category/${devcatname[3]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                <h4 className='subroutename submargin'>Programming Language</h4>
                                                {/* <h4 className='catsymb' >&gt;</h4> */}
                                            </NavLink>
                                        </div>
                                    </div >

                                )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[1]}`} onMouseEnter={() => handlesubsub(categoryname[1])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Business</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[1] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[1]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[4]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Entrepreneurship</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[5]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Communication</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[6]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Management</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[7]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Sales</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[2]}`} onMouseEnter={() => handlesubsub(categoryname[2])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Finance & Accounting</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[2] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[2]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[8]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Accounting & Bookkeeping</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[9]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Compliance</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[10]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Cryptocurrency & Blockchain</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[11]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Economics</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[12]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Finance</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[3]}`} onMouseEnter={() => handlesubsub(categoryname[3])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>IT & Software</h4>
                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[3] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[3]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[13]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>IT Certifications</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[14]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Network & Security</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[15]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Hardware</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[16]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Operating Systems & Servers</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[17]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Other IT & Software</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[4]}`} onMouseEnter={() => handlesubsub(categoryname[4])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Office Productivity</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[4] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[4]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[18]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Microsoft</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[19]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Apple</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[20]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Google</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[21]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>SAP</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[22]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Oracle</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[5]}`} onMouseEnter={() => handlesubsub(categoryname[5])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Personal Development</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[5] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[5]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[23]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Personal Transformation</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[24]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Personal Productivity</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[25]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Leadership</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[26]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Career Development</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[27]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Parenting & Relationships</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[6]}`} onMouseEnter={() => handlesubsub(categoryname[6])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Teaching & Academics</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[6] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[6]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[28]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Engineering</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[29]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Humanities</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[30]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Math</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[31]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Science</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[32]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Online Education</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[7]}`} onMouseEnter={() => handlesubsub(categoryname[7])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Music</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[7] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[7]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[33]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Instruments</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[34]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Music Production</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[35]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Music Fundamentals</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[36]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Vocal</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[37]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Music Techniques</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[8]}`} onMouseEnter={() => handlesubsub(categoryname[8])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Health & Fitness</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[8] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[8]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[38]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Fitness</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[39]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>General Health</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[40]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Sports</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[41]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Nutrition & Diet</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[42]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Yoga</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[9]}`} onMouseEnter={() => handlesubsub(categoryname[9])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Photography & Video</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[9] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[9]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[43]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Digital Photography</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[44]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Photography</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[45]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Portrait Photography</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[46]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Photography Tools</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[47]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Commercial Photography</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[10]}`} onMouseEnter={() => handlesubsub(categoryname[10])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Lifestyle</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[10] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[10]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[48]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Arts & Crafts</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[49]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Beauty & Makeup</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[50]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Esoteric Practices</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[51]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Food & Beverage</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[52]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Gaming</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[11]}`} onMouseEnter={() => handlesubsub(categoryname[11])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Marketing</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[11] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[11]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[53]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Digital Marketing</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[54]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Search Engine Optimization</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[55]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Social Media Marketing</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[56]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Branding</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[57]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Marketing Fundamentals</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                                <NavLink className="subroutenav" to={`/category/${categoryname[12]}`} onMouseEnter={() => handlesubsub(categoryname[12])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Design</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {
                                    showsubsub === categoryname[12] && (
                                        <div className='subsub' onMouseEnter={() => { handlesubsub(categoryname[12]) }}>
                                            <div className='subroute2'>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[58]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Web Design</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[59]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Graphic Design & Illustration</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[60]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Design Tools</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[61]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>User Experience Design</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                                <NavLink className="subroutenav" to={`/category/${devcatname[62]}`} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                                    <h4 className='subroutename submargin'>Game Design</h4>
                                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                                </NavLink>
                                            </div>
                                        </div>

                                    )
                                }
                            </div >
                        </div >
                    )}
                </div >
                <div className='searchbar_div'>
                    <button><IoIosSearch size={"1.5em"} onClick={handleSearch} /></button>
                    <input className='searchbar' type='text' placeholder='Search for anything' value={searchText} onChange={handleInput}></input>
                </div>
                {
                    isLoggedIn ? "" : (
                        <div className='navbar_cat udemybustab'>
                            <h4 className='navbar_mainfont'>Udemy Business</h4>
                        </div>
                    )
                }
                <div className='navbar_cat teachme'>
                    <h4 className='navbar_mainfont'>Teach on Udemy</h4>
                </div>
                {
                    isLoggedIn ? (
                        <div className='navbar_cat'>
                            <NavLink to="/mylearn" style={{ textDecoration: "none", color: "black" }}>
                                <h4 className='navbar_mainfont'>My Learning</h4>
                            </NavLink>
                        </div>
                    ) : ""
                }
                {
                    isLoggedIn ? (
                        <div className='heartlogo'>
                            <FaRegHeart size={"1.3em"} />
                        </div>
                    ) : ""
                }
                <div className='navbar_cat cartlogo'>
                    <NavLink to={"/cart"} style={{ textDecoration: "none", color: "black" }}>
                        {itemsInCart.length > 0 ? (
                            <div className='itemscartcount_round'>
                                {itemsInCart.length}
                            </div>
                        ) : ""}
                        <MdOutlineShoppingCart size={"1.5em"} style={{ margin: "15px 0px 0px 0px" }} />
                    </NavLink>
                </div>
                {
                    isLoggedIn ? (
                        <div className='usernav' onMouseEnter={() => setlogroute(true)} onMouseLeave={() => setlogroute(false)}>
                            <div className='profilediv'>
                                <span className='spanclass'>{userinfo.uname.charAt(0)}</span>
                            </div>
                            {showlogroute && (
                                <div className='logroute'>
                                    <h5>{userinfo.uname}</h5><hr />
                                    <h5 onClick={logoutfun}>Logout</h5>
                                </div>
                            )}
                        </div>
                    ) : (
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
                            <div className='globe_nav'>
                                <MdLanguage size={"1.5em"} style={{ margin: "5px 0px 0px 0px" }} />
                            </div>
                        </div>
                    )
                }

            </div >
        </div >
    )
}

export default NavbarCompo