import React, { useContext } from 'react'
import { storeData } from '../DataStore/DataStore';
import { useParams } from 'react-router-dom';
// import Arrow from './Arrow';

function SubcategoryPage() {
    const [datas] = useContext(storeData);
    console.log(datas);
    const mainName = useParams().name;
    const name = useParams().subname;
    console.log(name);
    const filtereddatas = datas.filter(item => item.category === mainName && item.subcategory === name);
    console.log(filtereddatas);
    return (
        <div>
            <h1 className='topic_categoryPage'>{name} Courses</h1>
            {/* <Arrow /> */}
        </div>
    )
}

export default SubcategoryPage