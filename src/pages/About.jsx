import React from 'react'
import styles from '../style'
import aboutPic from '../assets/about-pic.jpg'

const About = () => {
    return (
        <>
            <div className={`${styles.bg_niagara} h-64`} >
                <p className='text-2xl lg:text-4xl text-center text-white font-black pt-10'>ABOUT FROSTCITY</p>
            </div>
            <div className='w-10/12 lg:w-6/12 xl:w-4/12  mx-auto -m-32 space-y-5 pb-32'>
                <img src={aboutPic} alt="" />
                <p className='font-bold text-lg pt-5'>Who We Are</p>
                <p className=''> Air conditioning services play a significant role in this modern world. From preserving commercial foods, and medicines, or to simply giving you a comfortable sleep after a long day. Every business or household needs a dependable partner for all their air conditioning needs. This led to the birth of today’s TOP Cavite and Laguna HVAC company – FROSTCITY.
                </p>
                <p>FROSTCITY is more than a company, it is a family. A humble start-up established in October 2021 by Jasper Rocha, Monico Astorga, and Mabel Bonon. These founders have a common vision of creating a reputable company that creates solutions while keeping superb customer satisfaction, trust, and good relationship. FROSTCITY likewise values its people by protecting their welfare, healthy working environment, and career growth.
                    Soon, FROSTCITY will be expanding to provide that same best experience outside Cavite and Laguna. Wait till you hear about our new branches near you! Basta aircon, i-Frostcity na!</p>
                <p className='font-bold text-lg '>Our Mission</p>
                <p>To continuously seek for solutions while keeping our best practices and a healthy management, both for our employees and long-term relationship with every client.</p>
                <p className='font-bold text-lg '>Our Vision</p>
                <p>Frostcity envisions that every Filipino family can afford quality and affordable AC units. Through our company's values, we also aim to create more jobs and opportunities for our countrymen.</p>
                <p className='font-bold text-lg '>Our Values</p>
                <ul className='list-disc pl-5'>
                    <li>Family-centered, God-fearing organization.</li>
                    <li>A company that promotes respect amongst employees.</li>
                    <li>A company that empowers the skills and leadership of all employees.</li>
                </ul>
            </div>
        </>

    )
}

export default About