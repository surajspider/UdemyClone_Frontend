import React, { useContext } from 'react'
import { storeData } from '../DataStore/DataStore'
import { useParams } from 'react-router-dom';

function CategoriesPage() {
    const [datas] = useContext(storeData);
    console.log(datas);
    const name = useParams().name;
    console.log(name);
    const filtereddatas = datas.filter(item => {
        if (item.category === name) {
            return true;
        }
    });
    console.log(filtereddatas);
    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default CategoriesPage