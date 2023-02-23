import React from 'react'
import {
    aux,
    daikin,
    lg,
    panasonic,
    samsung,
    york
} from '../assets/brands'
import styles from '../style'

const Brands = () => {

    const brands = [
        aux,
        daikin,
        lg,
        panasonic,
        samsung,
        york
    ]

    return (
        <div className={`${styles.paddingX} flex flex-col justify-center items-center gap-10 py-20`}>
            {/* <h1 className='text-4xl capitalize font-nunitoSans font-black'>brands we offer</h1>
            <p className='lg:w-6/12 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quisquam obcaecati facere in odit earum facilis? Repudiandae ipsum quibusdam sed!</p> */}
            <div class="text-center">
                <h1 class="sm:text-3xl text-2xl title-font  mb-4 capitalize font-nunitoSans font-black">Brands We Offer</h1>
                <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p>
                <div class="flex mt-6 justify-center">
                    <div class="w-16 h-1 rounded-full bg-red-500 inline-flex"></div>
                </div>
            </div>
            <div className='flex flex-col items-center lg:flex-row gap-5 '>
                {
                    brands.map((brand, index) => (
                        <div key={index} className="flex justify-center">
                            <img src={brand} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Brands