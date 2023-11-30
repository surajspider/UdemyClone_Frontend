import React, { useContext } from 'react'
import { storeData } from '../DataStore/DataStore'
import { useParams } from 'react-router-dom';

function CategoriesPage() {
    const [datas] = useContext(storeData);
    console.log(datas);
    const name = useParams().name;
    console.log(name);
    const filtereddatas = datas.filter(item => item.category === name);
    console.log(filtereddatas);
    return (
        <div>
            <h1 className='topic_categoryPage'>{name} Courses</h1>
        </div>
    )
}

export default CategoriesPage