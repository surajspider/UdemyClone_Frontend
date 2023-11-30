import React, { useContext } from 'react'
import { storeData } from '../DataStore/DataStore';
import { useParams } from 'react-router-dom';

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
        </div>
    )
}

export default SubcategoryPage