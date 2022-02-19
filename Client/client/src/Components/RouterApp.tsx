import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Machine from './Machine/Machine'

function RouterApp() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/machine" element={<Machine/>}/>
        </Routes>
    )
}

export default RouterApp