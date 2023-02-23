import React from 'react'
import { Link } from 'react-router-dom'
import cleaning from '../assets/cleaning.png'
import install from '../assets/install.png'
import repair from '../assets/repair.png'
import { services } from '../constants/services'
import styles from '../style'

const Services = () => {
    return (
        <div className={`${styles.paddingX} py-20 space-y-20`}>
            {/* <h1 className='text-center text-4xl capitalize font-nunitoSans font-black'>avail our services</h1> */}
            {/* <div className={`${styles.paddingX}  flex flex-col md:flex-row gap-16 md:gap-10`}>
                {
                    services.map((s) => (
                        <div key={s.id} className='flex flex-col justify-center items-center gap-5 text-center lg:w-4/12 lg:max-w-4/12'>
                            <div className=' h-[175px] w-[175px] rounded-full overflow-hidden mb-5 shadow-md'>
                                <img src={s.img} alt="" />
                            </div>
                            <p className='sm:min-h-[150px]'>{s.desc}</p>
                            <p className='font-bold text-lg'>{s.title}</p>
                            <button className='bg-red-500 text-white px-10 py-2 rounded-full shadow-md uppercase'>
                                <Link to={'/account/book'}>Book Now</Link>
                            </button>
                        </div>
                    ))
                }

            </div> */}

            <section class="body-font">
                <div class="container px-5 mx-auto">
                    <div class="text-center mb-20">
                        <h1 class="sm:text-3xl text-2xl title-font  mb-4 capitalize font-nunitoSans font-black">Avail Our Services</h1>
                        <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy.</p>
                        <div class="flex mt-6 justify-center">
                            <div class="w-16 h-1 rounded-full bg-red-500 inline-flex"></div>
                        </div>
                    </div>
                    <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">

                        {
                            services.map((s) => (
                                <div key={s.id} class="p-4 md:w-1/3 flex flex-col text-center items-center">
                                    <div class="overflow-hidden w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-5 flex-shrink-0">
                                        <img src={s.img} alt={'services logo'} />
                                    </div>
                                    <div class="flex-grow">
                                        <h2 class="text-gray-900 text-lg title-font font-medium mb-3">{s.title}</h2>
                                        <p class="leading-relaxed text-base mb-5">{s.desc}</p>
                                        <button className='bg-red-500 text-white text-sm px-4 py-2 rounded-full shadow-md capitalize'>
                                            <Link to={'/account/book'}>Get Quote Now</Link>
                                        </button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Services