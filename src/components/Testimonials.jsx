import React from 'react'
import { Quote } from 'tabler-icons-react'
import { testimonials } from '../constants/testimonials'
import styles from '../style'


const Card = ({ img, testimony, name, position }) => {
    return (
        // <div className=' flex flex-col justify-between gap-5   items-center text-center bg-white rounded-md shadow-md px-10 pb-10 w-[364px] 
        // h-[463px] min-h-[400px] max-h-[463px]'>
        //     <div className='-mt-[75px] justify-self-start rounded-full overflow-hidden h-[125px] w-[125px] '>
        //         <img src={img} alt="" />
        //     </div>
        //     <p className={`${styles.text_casal} inline-flex text-lg overflow-hidden text-ellipsis `}>{testimony}</p>
        //     <div className='flex flex-col justify-end items-center gap-5'>
        //         <Quote size={40} color={'#049C9C'} />
        //         <p className={`${styles.text_accent} text-xl font-bold`}>{name}</p>
        //         <p className={`${styles.text_casal} -mt-5`}>{position}</p>
        //     </div>
        // </div>
        <div class=" lg:w-1/3 lg:mb-0 mb-6 p-4">
            <div class="h-full text-center">
                <img alt="testimonial" class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={img} />
                <p class="leading-relaxed">{testimony}</p>
                <span class="inline-block h-1 w-10 rounded bg-red-500 mt-6 mb-4"></span>
                <p class={`${styles.text_casal}`}>{position}</p>
                <h2 class={`${styles.text_accent} font-medium title-font tracking-wider text-sm`}>{name}</h2>
            </div>
        </div>
    )
}

const Testimonials = () => {
    return (
        <div className={`${styles.paddingX} flex flex-col justify-center items-center gap-5 py-20`}>
            <h1 className='text-center text-4xl capitalize font-nunitoSans font-black'>testimonials</h1>
            <p className='w-6/12 text-center'>What our clients says about us</p>
            <div class="flex justify-center pb-6">
                <div class="w-16 h-1 rounded-full bg-red-500 inline-flex"></div>
            </div>
            <section class=" body-font">
                <div class="container px-5 mx-auto">
                    <div class="bg-white lg:p-4 rounded-lg shadow-lg flex flex-wrap -m-4">

                        {
                            testimonials.map((t) =>
                            (<Card img={t.img}
                                testimony={t.title}
                                name={t.name}
                                position={t.position} />)
                            )
                        }
                    </div>
                </div>
            </section>
            {/* <div className='flex flex-col lg:flex-row justify-center items-center gap-24 lg:gap-10 w-10/12 mt-24'>
                {
                    testimonials.map((t) =>
                    (<Card img={t.img}
                        testimony={t.title}
                        name={t.name}
                        position={t.position} />)
                    )
                }
            </div> */}

        </div>
    )
}

export default Testimonials