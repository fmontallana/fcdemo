import React from 'react'
import { Brands, Hero, Services, Testimonials, WhyChooseUs } from '../../components'
import Contact from '../Contact'

const HomeContent = () => {
    return (
        <div>
            <Hero />
            <WhyChooseUs />
            <Brands />
            <div className='bg-white'>
                <Services />
            </div>
            <Testimonials />
            <Contact />
        </div>
    )
}

export default HomeContent