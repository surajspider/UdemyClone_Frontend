import React, { useContext } from 'react'
import { storeData } from '../DataStore/DataStore'
import { useParams } from 'react-router-dom';

function CategoriesPage() {
    const [datas] = useContext(storeData);
    console.log(datas);
    const devcatname = ["web development", "data science", "mobile development", "programming language"];
    const buscatname = ["entrepreneurship", "communication", "management", "sales"];
    const name = useParams().name;
    console.log(name);
    let subcats = [];

    if (name === "development") {
        subcats = devcatname;
    } else if (name === "business") {
        subcats = buscatname;
    }
    console.log(subcats);
    const filtereddatas = datas.filter(item => item.category === name);
    console.log(filtereddatas);
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
                        return (
                            <div className='mostitem_div' key={index}>
                                <div className='mostpop_img'>
                                    <img src={item.image} alt='not found' className='imgfil' />
                                </div>
                                <div className='topicitem'>
                                    <h5 className='topicfont'>{item.courseName}</h5>
                                    <p className='pmargin'>{item.creator}</p>
                                    <span>{item.rating} (3256)</span>
                                    <h5>{item.offerPrice}</h5>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategoriesPage