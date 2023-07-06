import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'


import Landing from '../pages/Landing'
import Categories from '../pages/Categories'
import Category from '../pages/NewCategory'
import NewCategory from '../pages/NewCategory'

import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/newcategory" element={<NewCategory />} />
                <Route exact path="/category/:id" element={<Category />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes