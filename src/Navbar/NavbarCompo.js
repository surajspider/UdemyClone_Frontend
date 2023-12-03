import axios from 'axios';
import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';

function NavbarCompo() {
    const [showsubroute, setsubroute] = useState(false);
    const [showsubsub, setsubsub] = useState(null);
    const [searchText, setSearchText] = useState("");
    const navi = useNavigate();
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
            const response = await axios.get(`http://localhost:4500/data/search?searchText=${searchText}`); //https://udemyclone-backend.onrender.com/data/search?searchText=${searchText} http://localhost:4500/data/search?searchText=${searchText}
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
                                    </div>

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[1]}`} onMouseEnter={() => handlesubsub(categoryname[1])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Business</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[1] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[2]}`} onMouseEnter={() => handlesubsub(categoryname[2])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Finance & Accounting</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[2] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[3]}`} onMouseEnter={() => handlesubsub(categoryname[3])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>IT & Software</h4>
                                    {/* <h4 className='catsymb' >&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[3] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[4]}`} onMouseEnter={() => handlesubsub(categoryname[4])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Office Productivity</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[4] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[5]}`} onMouseEnter={() => handlesubsub(categoryname[5])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Personal Development</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[5] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[6]}`} onMouseEnter={() => handlesubsub(categoryname[6])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Teaching & Academics</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[6] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[7]}`} onMouseEnter={() => handlesubsub(categoryname[7])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Music</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[7] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[8]}`} onMouseEnter={() => handlesubsub(categoryname[8])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Health & Fitness</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[8] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[9]}`} onMouseEnter={() => handlesubsub(categoryname[9])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Photography & Video</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[9] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[10]}`} onMouseEnter={() => handlesubsub(categoryname[10])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Lifestyle</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[10] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[11]}`} onMouseEnter={() => handlesubsub(categoryname[11])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Marketing</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[11] && (
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

                                )}
                                <NavLink className="subroutenav" to={`/category/${categoryname[12]}`} onMouseEnter={() => handlesubsub(categoryname[12])} onMouseLeave={handlesubsubleave} style={({ isActive }) => ({ color: isActive ? "blueviolet" : "" })}>
                                    <h4 className='subroutename submargin'>Design</h4>
                                    {/* <h4 className='catsymb'>&gt;</h4> */}
                                </NavLink>
                                {showsubsub === categoryname[12] && (
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

                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className='searchbar_div'>
                    <button><IoIosSearch size={"1.5em"} onClick={handleSearch} /></button>
                    <input className='searchbar' type='text' placeholder='Search for anything' value={searchText} onChange={handleInput}></input>
                </div>
                <div className='navbar_cat'>
                    <h4 className='navbar_mainfont'>Udemy Business</h4>
                </div>
                <div className='navbar_cat'>
                    <h4 className='navbar_mainfont'>Teach on Udemy</h4>
                </div>
                <div className='navbar_cat'>
                    <NavLink to={"/cart"}>
                        <MdOutlineShoppingCart size={"1.5em"} style={{ margin: "15px 0px 0px 0px" }} />
                    </NavLink>
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