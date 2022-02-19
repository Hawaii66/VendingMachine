import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Machine from './Machine/Machine'
import Success from './StatusPage/Success/Success'
import Error from './StatusPage/Error/Error'

function RouterApp() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/machine" element={<Machine/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/error" element={<Error/>}/>
        </Routes>
    )
}

export default RouterApp