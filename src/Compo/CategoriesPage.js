import React, { useContext, useState } from 'react'
import { storeData } from '../DataStore/DataStore'
import { useParams } from 'react-router-dom';
import RatingStars from './RatingStars';
import { FaStar } from 'react-icons/fa';
import Footer from './Footer';

function CategoriesPage() {
    const [datas] = useContext(storeData);
    console.log(datas);
    const devcatname = ["web development", "data science", "mobile development", "programming language"];
    const buscatname = ["entrepreneurship", "communication", "management", "sales"];
    const poptopics = ["Python", "Data Science", "React JS", "Java", "c#(Programming Language)", "Web Development", "Javascript", "Unreal Engine", "Machine Learning", "Deep Learning"]
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
    const filtereddatas = datas.filter(item => item.category === name);
    console.log(filtereddatas);
    const [isHovered, setIsHovered] = useState(null);

    const handleContainerHover = (index) => {
        setIsHovered(index);
    };

    const handleContainerLeave = () => {
        setIsHovered(null);
    };
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
                    {filtereddatas.filter((item) => item.id % 2 === 0).slice(0, 5).map((item, index) => {
                        const bestsel = index === 1 || index === 3;
                        return (
                            <div className={`mostitem_div ${isHovered === index ? 'hovered' : ''}`} key={index} onMouseEnter={() => handleContainerHover(index)} onMouseLeave={handleContainerLeave}>

                                <div className='mostpop_img'>
                                    <img src={item.image} alt='not found' className='imgfil' />
                                </div>
                                <div className='topicitem'>
                                    <h5 className='topicfont'>{item.courseName}</h5>
                                    <p className='pmargin'>{item.creator}</p>
                                    <div className='rating_div'>{item.rating}<div><RatingStars rating={item.rating} /></div>(3256)</div>
                                    <h4 style={{ marginTop: "1%" }}>₹{item.offerPrice}</h4>
                                    {bestsel && <h4 className='bestsel'>Bestseller</h4>}
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
                                                <button className='addtocart'>Add to Cart</button>
                                                <div className='heartbutton_img'>
                                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9nKX4mmWawwlgehpJGHNxT5OcxKVlRsIzA&usqp=CAU' alt='not found' className='imgfil' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
                <div className='poptopics_div'>
                    <h2>Popular topics</h2>
                    <div className='popmain_div'>
                        {poptopics.map((item, index) => {
                            return (
                                <p className='poptopics'>{item}</p>
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
                            <h4>Rating</h4>
                        </div>
                        <div className='rightcontainer'>

                            {filtereddatas.slice(0, 8).map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className='item_maindiv'>
                                            <div className='item_imgdiv'>
                                                <img src={item.image} alt='not found' className='imgfil' />
                                            </div>
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