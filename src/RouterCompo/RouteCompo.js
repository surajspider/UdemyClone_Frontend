import React from 'react'
import NavbarCompo from '../Navbar/NavbarCompo'
import { Route, Routes } from 'react-router-dom'
import Home from '../Compo/Home'
import Register from '../Compo/Register/Register'
import Login from '../Compo/Register/Login'

function RouteCompo() {
    return (
        <div>
            <NavbarCompo />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </div>
    )
}

export default RouteCompo