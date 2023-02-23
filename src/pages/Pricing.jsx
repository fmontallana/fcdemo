import React from 'react'
import {
    j1,
    j2,
    j3,
    sale1,
    sale2,
    sale3,
    sale4,
    sale5,
    ad,
    tr3,
    tr5,
} from '../assets/pricing'
import { pricing } from '../constants/pricing'
import styles from '../style'


const Pricing = () => {
    return (
        <div className={`${styles.paddingX} h-full w-full flex flex-col sm:flex-row sm:items-start sm:gap-5 justify-start items-center py-5`}>
            <div className='h-full sm:w-4/12 pb-5'>
                <img src={ad} alt="" />
            </div>
            <div className=' w-8/12'>
                {/* <div className='flex flex-wrap justify-start  align-top gap-5 ' >
                    <div className='flex items-center w-64'>
                        <img src={sale1} alt="" />
                    </div>
                    <div className='w-64'>
                        <img src={sale2} alt="" />
                    </div>
                    <div className='w-64'>
                        <img src={sale3} alt="" />
                    </div>
                    <div className='w-64'>
                        <img src={sale4} alt="" />
                    </div>
                    <div className='w-64'>
                        <img src={sale5} alt="" />
                    </div>
                    <div className='w-64'>
                        <img src={j1} alt="" />
                    </div>
                    <div className='w-64'>
                        <img src={j2} alt="" />
                    </div>
                    <div className='w-64'>
                        <img src={j3} alt="" />
                    </div>
                    <div className='w-64'>
                        <img src={tr3} alt="" />
                    </div>
                    <div className='w-64'>
                        <img src={tr5} alt="" />
                    </div>
                </div> */}

                <div className='flex flex-wrap justify-start  align-top gap-5 ' >
                    {
                        pricing.map((item) => {
                            return (
                                <div key={item.id} class="lg:w-3/12 sm:w-3/12 overflow-hidden hover:scale-110 ease-in-out duration-300">
                                    <a class="block relative rounded overflow-hidden ">
                                        <img alt="ecommerce" class="object-fit object-center w-full h-full block " src={item.image} />
                                    </a>
                                    <div class="mt-4">
                                        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{item.code}</h3>
                                        <h2 class="text-gray-900 title-font text-lg sm:text-sm font-medium">{item.title}</h2>
                                        <p class="mt-1 text-xs">SRP: <span className='line-through'>{item.srp.toLocaleString("en-PH", { style: "currency", currency: "Php" })}</span></p>
                                        <p class="mt-1"><span className='text-sm'>Now:</span> {item.discounted.toLocaleString("en-PH", { style: "currency", currency: "Php" })}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


                {/* <section class="text-gray-600 body-font">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="flex flex-wrap -m-4">


                        </div>
                    </div>
                </section> */}
            </div>
        </div>
    )
}

export default Pricing