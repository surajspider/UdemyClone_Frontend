import React from 'react'
import NavbarCompo from '../Navbar/NavbarCompo'
import { Route, Routes } from 'react-router-dom'
import Home from '../Compo/Home'

function RouteCompo() {
    return (
        <div>
            <NavbarCompo />
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </div>
    )
}

export default RouteCompo