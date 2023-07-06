import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Home from '../pages/Home'
import Company from '../pages/Company'
import NewCompany from '../pages/NewCompany'

import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/newcompany" element={<NewCompany />} />
                <Route exact path="/company/:id" element={<Company />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes