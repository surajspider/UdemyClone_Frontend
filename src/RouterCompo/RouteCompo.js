import React from 'react'
import NavbarCompo from '../Navbar/NavbarCompo'
import { Route, Routes } from 'react-router-dom'
import Home from '../Compo/Home'
import Register from '../Compo/Register/Register'
import Login from '../Compo/Register/Login'
import DataStore from '../DataStore/DataStore'
import CategoriesPage from '../Compo/CategoriesPage'
import SubcategoryPage from '../Compo/SubcategoryPage'

function RouteCompo() {
    return (
        <div>
            <DataStore>
                <NavbarCompo />
                <Routes>

                    <Route path="/" element={<Home />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/category/:name" element={<CategoriesPage />}></Route>
                    <Route path='/category/:name/:subname' element={<SubcategoryPage />}></Route>
                </Routes>
            </DataStore>
        </div>
    )
}

export default RouteCompo