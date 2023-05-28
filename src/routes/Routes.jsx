import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../view/login/Login'
import Home from '../view/inicio/Home'

const Routers = () => {

    const token = localStorage.getItem('token');

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/contactos" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers