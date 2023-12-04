import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';
import axios from 'axios';

function Mylearning() {
    const navi = useNavigate();
    const navigate = () => {
        navi("/");
    }
    const userID = localStorage.getItem("userID");
    const [boughtCourses, setBoughtCourses] = useState([]);
    useEffect(() => {
        const fetchBoughtCourses = async () => {
            try {
                const response = await axios.get(`https://udemyclone-backend.onrender.com/api/getboughtcourses?userID=${userID}`); //https://udemyclone-backend.onrender.com/api/getboughtcourses?userID=${userID}  http://localhost:4500/api/getboughtcourses?userID=${userID}
                if (response.data.success) {
                    setBoughtCourses(response.data.boughtCourses);
                } else {
                    console.error('Error fetching bought courses:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching bought courses:', error);
            }
        };

        if (userID) {
            fetchBoughtCourses();
        }
    }, [userID]);
    return (
        <div>
            <div className='header_mylearning'>
                <div className='my_learntopic'>
                    <h1>My learning</h1>
                    <h3 style={{ textDecoration: "underline" }}>All Courses</h3>
                </div>
            </div>
            {boughtCourses.length === 0 ? (
                <div className='noitems_parent_mylearndiv'>
                    <div className='noitemscart_div'>
                        <div className='noitemsimage'>
                            <img src='https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2.jpg' alt='not found' className='imgfil' />
                        </div>
                        <p>No Courses in your account! Buy some courses and start learning!!</p>
                        <button className='keepshopping' onClick={navigate}>Keep shopping</button>
                    </div>
                </div>
            ) : (
                <div className='courses_list'>
                    <div className='mostpop_div'>
                        {boughtCourses.map((item, index) => {
                            return (
                                <div className="mostitem_div" key={index}>
                                    <div className='mostpop_img'>
                                        <img src={item.image} alt='not found' className='imgfil' />
                                    </div>
                                    <div className='topicitem'>
                                        <h5 className='topicfont'>{item.courseName}</h5>
                                        <p className='pmargin'>{item.creator}</p>
                                        <div className='rating_div'>{item.rating}<div><RatingStars rating={item.rating} /></div>(3256)</div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Mylearning