import React, { useContext, useState } from 'react'
import { storeData } from '../DataStore/DataStore'
import { useParams } from 'react-router-dom';
import RatingStars from './RatingStars';
import { FaStar } from 'react-icons/fa';
import { IoMdArrowDropdown } from "react-icons/io";
import Footer from './Footer';
import CartButton from '../Cart/CartButton';

function CategoriesPage() {
    const [starview, setstarview] = useState(true);
    const [videoview, setvideo] = useState(true);
    const [datas] = useContext(storeData);
    console.log(datas);
    const devcatname = ["web development", "data science", "mobile development", "programming language"];
    const buscatname = ["entrepreneurship", "communication", "management", "sales"];
    const poptopics = ["Python", "Data Science", "React JS", "Java", "c#", "Web Development", "Javascript", "Unreal Engine", "Machine Learning", "Deep Learning"]
    const name = useParams().name;
    console.log(name);
    let subcats = [];
    const instructors = [
        {
            name: "Dr. Angela Yu",
            course: "Python, Datascience",
            rating: 4.6,
            students: 7894561,
            courses: 7,
            img: "https://img-c.udemycdn.com/user/75x75/31334738_a13c_3.jpg"
        },
        {
            name: "Maximillian",
            course: "React JS, React Hooks",
            rating: 4.3,
            students: 794561,
            courses: 42,
            img: "https://img-c.udemycdn.com/user/75x75/31926668_94e7_6.jpg"
        },
        {
            name: "Jonas",
            course: "Javascript, React JS",
            rating: 4.8,
            students: 784561,
            courses: 48,
            img: "https://img-c.udemycdn.com/user/75x75/7799204_2091_5.jpg"
        },
        {
            name: "Jose Portilla",
            course: "Python, Datascience",
            rating: 4.0,
            students: 94561,
            courses: 54,
            img: "https://img-c.udemycdn.com/user/75x75/9685726_67e7_4.jpg"
        }
    ]

    if (name === "development") {
        subcats = devcatname;
    } else if (name === "business") {
        subcats = buscatname;
    }
    console.log(subcats);
    let subcat = "";
    let dummycat = datas.find((item) => {
        if (item.category === name) {
            subcat = item.category;
            return item
        }
        else if (item.subcategory === name) {
            subcat = item.category;
            return item
        }
        else {
            subcat = undefined;
            return false;
        }
    });
    console.log("dummycat:", dummycat);
    console.log("category name:", subcat);
    const filtereddatas = datas.filter(item => item.category === name || item.subcategory === name);
    console.log(filtereddatas);
    const [isHovered, setIsHovered] = useState(null);
    const [ishoveredtwo, setIsHoveredtwo] = useState(null);

    const handleContainerHover = (index) => {
        setIsHovered(index);
    };

    const handleContainerLeave = () => {
        setIsHovered(null);
    };
    const handleContainerHovertwo = (index) => {
        setIsHoveredtwo(index);
    }
    const handleContainerLeavetwo = () => {
        setIsHoveredtwo(null);
    }
    return (
        <div>
            <div className='navsub'>
                <h5>{name}</h5>
                <div className='arrowimg'>
                    <img src='https://s.udemycdn.com/browse_components/link-bar/large-next.svg' alt='not found' className='imgfil' />
                </div>
                {subcats.map((item, index) => {
                    return (
                        <h5 key={index} className='h5normal'>{item}</h5>
                    )
                })}
            </div>
            <div className='categorypage_maindiv'>
                <h1 className='topic_categoryPage'>{name} Courses</h1>
                <h2>Courses to get you started</h2>
                <h4 className='mostpop'>Most popular</h4>
                <div className='line'>
                    <hr className='linehr'></hr>
                </div>
                <div className='mostpop_div'>
                    {datas.filter((item) => item.category === subcat && item.id % 2 === 0).slice(0, 5).map((item, index) => {
                        const bestsel = index === 1 || index === 3;
                        return (
                            <div className={`mostitem_div ${isHovered === index ? 'hovered' : ''}`} key={index} onMouseEnter={() => handleContainerHover(index)} onMouseLeave={handleContainerLeave}>

                                <div className='mostpop_img'>
                                    <img src={item.image} alt='not found' className='imgfil' />
                                </div>
                                {isHovered === index && (
                                    <div className='arrow-container'>
                                        <div className="arrow"></div>
                                        <div className='additional-content'>
                                            <h4 style={{ margin: 0 }}>{item.courseName}</h4>
                                            <h5>What you'll learn</h5>
                                            <ul className='pointlist'>
                                                <li>{item.point1}</li>
                                                <li>{item.point2}</li>
                                                <li>{item.point3}</li>
                                            </ul>
                                            <div className='buttondiv'>
                                                <CartButton item={item} />
                                                <div className='heartbutton_img'>
                                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9nKX4mmWawwlgehpJGHNxT5OcxKVlRsIzA&usqp=CAU' alt='not found' className='imgfil' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className='topicitem'>
                                    <h5 className='topicfont'>{item.courseName}</h5>
                                    <p className='pmargin'>{item.creator}</p>
                                    <div className='rating_div'>{item.rating}<div><RatingStars rating={item.rating} /></div>(3256)</div>
                                    <h4 style={{ marginTop: "1%" }}>₹{item.offerPrice}</h4>
                                    {bestsel && <h4 className='bestsel'>Bestseller</h4>}
                                </div>

                            </div>
                        )
                    })}
                </div>
                <div className='poptopics_div'>
                    <h2>Popular topics</h2>
                    <div className='popmain_div'>
                        {poptopics.map((item, index) => {
                            return (
                                <p key={index} className='poptopics'>{item}</p>
                            )
                        })}
                    </div>
                </div>
                <div className='popinstruc_div'>
                    <h2>Popular Instructors</h2>
                    <div className='popinstruc_maindiv'>
                        {instructors.map((item, index) => {
                            return (
                                <div className='popinstruc_main' key={index}>
                                    <div className='imginstruc_div'>
                                        <img src={item.img} alt='not found' className='immgfil' />
                                    </div>
                                    <div className='instruc_content'>
                                        <h4 style={{ marginBottom: 0, marginTop: "3%" }}>{item.name}</h4>
                                        <p style={{ margin: 0 }}>{item.course}</p>
                                        <p style={{ margin: 0 }}>{item.rating}<FaStar color='#ffb800' />Instructor Rating</p>
                                        <p style={{ margin: 0 }}>{item.students} Students</p>
                                        <p style={{ margin: 0 }}>{item.courses} courses</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='allcourses_div'>
                    <h2>All {name} Courses</h2>
                    <div className='allcourses_maindiv'>
                        <div className='leftcontainer'>
                            <div className="ratingdropdown" onClick={() => setstarview(!starview)}>
                                <h2>Rating</h2>
                                <div className={`droplogo_div ${!starview ? 'rotate' : 'rotateflip'}`}><IoMdArrowDropdown size={"2em"} /></div>
                            </div>
                            {starview && (
                                <div>
                                    <div className='stars_div'>
                                        <input name='star' type='radio'></input>
                                        <RatingStars rating={4.5} />
                                        <p className="starratingnum" style={{ margin: 0 }}>&nbsp;4.5 & up (10,000)</p>
                                    </div>
                                    <div className='stars_div'>
                                        <input name='star' type='radio'></input>
                                        <RatingStars rating={4} />
                                        <p style={{ margin: 0 }}>&nbsp;4 & up (10,000)</p>
                                    </div>
                                    <div className='stars_div'>
                                        <input name='star' type='radio'></input>
                                        <RatingStars rating={3.5} />
                                        <p style={{ margin: 0 }}>&nbsp;3.5 & up (10,000)</p>
                                    </div>
                                    <div className='stars_div'>
                                        <input name='star' type='radio'></input>
                                        <RatingStars rating={3} />
                                        <p style={{ margin: 0 }}>&nbsp;3 & up (10,000)</p>
                                    </div>
                                </div>
                            )}
                            <hr />
                            <div className="ratingdropdown" onClick={() => setvideo(!videoview)}>
                                <h3>Video Duration</h3>
                                <div className={`droplogo_div ${!videoview ? 'rotate' : 'rotateflip'}`}><IoMdArrowDropdown size={"2em"} /></div>
                            </div>
                            {videoview && (
                                <div>
                                    <div className='stars_div'>
                                        <input name='star' type='checkbox'></input>
                                        <p style={{ margin: 0 }}>&nbsp;0 - 1 hr (667)</p>
                                    </div>
                                    <div className='stars_div'>
                                        <input name='star' type='checkbox'></input>
                                        <p style={{ margin: 0 }}>&nbsp;1 - 3 hr (667)</p>
                                    </div>
                                    <div className='stars_div'>
                                        <input name='star' type='checkbox'></input>
                                        <p style={{ margin: 0 }}>&nbsp;3 - 6 hr (667)</p>
                                    </div>
                                    <div className='stars_div'>
                                        <input name='star' type='checkbox'></input>
                                        <p style={{ margin: 0 }}>&nbsp;6 - 17 hr (667)</p>
                                    </div>
                                </div>
                            )}
                            <hr />
                            <div className="ratingdropdown">
                                <h3>Topic</h3>
                                <div className={`droplogo_div`}><IoMdArrowDropdown size={"2em"} /></div>
                            </div>
                            <hr />
                            <div className="ratingdropdown">
                                <h3>Subcategory</h3>
                                <div className={`droplogo_div`}><IoMdArrowDropdown size={"2em"} /></div>
                            </div>
                            <hr />
                            <div className="ratingdropdown">
                                <h3>Level</h3>
                                <div className={`droplogo_div`}><IoMdArrowDropdown size={"2em"} /></div>
                            </div>
                            <hr />
                            <div className="ratingdropdown">
                                <h3>Language</h3>
                                <div className={`droplogo_div`}><IoMdArrowDropdown size={"2em"} /></div>
                            </div>
                            <hr />
                            <div className="ratingdropdown">
                                <h3>Price</h3>
                                <div className={`droplogo_div`}><IoMdArrowDropdown size={"2em"} /></div>
                            </div>
                            <hr />
                        </div>
                        <div className='rightcontainer'>

                            {filtereddatas.slice(0, 8).map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className={`item_maindiv ${ishoveredtwo === index ? 'hovered' : ''}`} onMouseEnter={() => handleContainerHovertwo(index)} onMouseLeave={handleContainerLeavetwo}>
                                            <div className='item_imgdiv'>
                                                <img src={item.image} alt='not found' className='imgfil' />
                                            </div>
                                            {ishoveredtwo === index && (
                                                <div className='arrow-containertwo'>
                                                    <div className="arrow"></div>
                                                    <div className='additional-content'>
                                                        <h4 style={{ margin: 0 }}>{item.courseName}</h4>
                                                        <h5>What you'll learn</h5>
                                                        <ul className='pointlist'>
                                                            <li>{item.point1}</li>
                                                            <li>{item.point2}</li>
                                                            <li>{item.point3}</li>
                                                        </ul>
                                                        <div className='buttondiv'>
                                                            <CartButton item={item} />
                                                            <div className='heartbutton_img'>
                                                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9nKX4mmWawwlgehpJGHNxT5OcxKVlRsIzA&usqp=CAU' alt='not found' className='imgfil' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className='item_contentdiv'>
                                                <h4 className='padd'>{item.courseName}</h4>
                                                <p className='padd'>{item.creator}</p>
                                                <div className='rating_div'>{item.rating}<div><RatingStars rating={item.rating} /></div>(3256)</div>
                                                <p className='padd'>{item.hrs} total hours . {item.lectures} lectures . All levels</p>
                                            </div>
                                            <div className='item_pricediv'>
                                                <h4>₹{item.offerPrice}</h4>
                                            </div>

                                        </div>
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CategoriesPage