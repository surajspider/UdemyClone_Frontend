import React from 'react'
import NavbarCompo from '../Navbar/NavbarCompo'
import { Route, Routes } from 'react-router-dom'
import Home from '../Compo/Home'
import Register from '../Compo/Register/Register'
import Login from '../Compo/Register/Login'
import DataStore from '../DataStore/DataStore'
import CategoriesPage from '../Compo/CategoriesPage'
import CartPage from '../Cart/CartPage'
import SearchPage from '../Compo/SearchPage'
import Mylearning from '../Compo/Mylearning'

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
                    <Route path='/cart' element={<CartPage />}></Route>
                    <Route path='/search' element={<SearchPage />}></Route>
                    <Route path='/mylearn' element={<Mylearning />}></Route>
                </Routes>
            </DataStore>
        </div>
    )
}

export default RouteCompo