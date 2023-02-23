import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/footer-logo.png'
import styles from '../style'

const Footer = () => {
    return (
        <div className={` bg-white`}>
            <div className={`${styles.paddingX} flex flex-col justify-center items-center`}>
                {/* <div className='flex justify-center items-center my-10'>
                    <img src={logo} alt="" />
                </div>
                <div className='flex flex-col md:flex-row gap-5 my-5 w-9/12 md:max-w-9/12'>
                    <div className={`flex flex-col justify-start text-sm gap-2 h-auto md:w-3/12 ${styles.text_casal}`}>
                        <p className='font-black capitalize text-lg font-nunitoSans mb-2'>our location</p>
                        <p>Blk 38 Lot 10 Brgy. Fatima II, Sta Maria, Dasmariñas, <br /> 4115 Cavite</p>
                        <a className={`${styles.text_accent} font-bold`} href="https://goo.gl/maps/bevvTS63xxESogd7A" >Get directions</a>
                    </div>
                    <div className={`flex flex-col justify-start text-sm gap-2 h-auto md:w-3/12 ${styles.text_casal}`}>
                        <p className='font-black capitalize text-lg font-nunitoSans mb-2'>Opening Hours</p>
                        <div>
                            <p>Monday - Friday</p>
                            <p>8:00 AM - 5:00 PM</p>
                        </div>
                        <div>
                            <p>Saturday - Sunday</p>
                            <p>8:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                    <div className={`flex flex-col justify-start text-sm gap-2 h-auto md:w-3/12 ${styles.text_casal}`}>
                        <p className='font-black capitalize text-lg font-nunitoSans mb-2'>Quick Contact</p>
                        <p>Globe +63 (995) 820 2413 </p>
                        <p>Smart +63 (928) 552 0546</p>
                        <p>frostcityph@gmail.com</p>
                    </div>
                    <div className={`flex flex-col justify-start text-sm gap-2 h-auto md:w-3/12 ${styles.text_casal}`}>
                        <p className='font-black capitalize text-lg font-nunitoSans mb-2'>Quick Links</p>
                        <Link className={`${styles.text_accent} font-bold`} to="about">About us</Link>
                        <Link className={`${styles.text_accent} font-bold`} to="contact">Contact us</Link>
                        <Link className={`${styles.text_accent} font-bold`} to="gallery">Gallery</Link>
                        <Link className={`${styles.text_accent} font-bold`} to="pricing">Pricing</Link>
                    </div>

                </div> */}
                <footer class=" body-font">
                    <div class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col gap-5">
                        <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left flex justify-center items-center">
                            <img src={logo} alt="" />
                        </div>
                        <div class="flex-grow flex flex-wrap  -mb-10 md:mt-0 mt-10 md:text-left text-center gap-3 sm:gap-0">
                            <div class="lg:w-1/4 md:w-1/2 w-full px-4 mb-2 text-sm ">
                                <p className='font-black capitalize text-lg font-nunitoSans mb-2'>our location</p>
                                <p >Blk 38 Lot 10 Brgy. Fatima II, Sta Maria, Dasmariñas, 4115 Cavite</p>
                                <a className={`${styles.text_accent} font-bold `} href="https://goo.gl/maps/bevvTS63xxESogd7A" >Get directions</a>
                            </div>
                            <div class="lg:w-1/4 md:w-1/2 w-full px-4 mb-2 text-sm space-y-1">
                                <p className='font-black capitalize text-lg font-nunitoSans mb-2'>Opening Hours</p>
                                <div>
                                    <p>Monday - Friday</p>
                                    <p>8:00 AM - 5:00 PM</p>
                                </div>
                                <div>
                                    <p>Saturday - Sunday</p>
                                    <p>8:00 AM - 4:00 PM</p>
                                </div>
                            </div>
                            <div class="lg:w-1/4 md:w-1/2 w-full px-4 mb-2 text-sm space-y-1">
                                <p className='font-black capitalize text-lg font-nunitoSans mb-2'>Quick Contact</p>
                                <p>Globe <br /> +63 (995) 820 2413 </p>
                                <p>Smart <br /> +63 (928) 552 0546</p>
                                <p>frostcityph@gmail.com</p>
                            </div>
                            <div class="lg:w-1/4 md:w-1/2 w-full px-4 mb-2 text-sm flex flex-col space-y-1">
                                <p className='font-black capitalize text-lg font-nunitoSans mb-2'>Quick Links</p>
                                <a className={`${styles.text_accent} font-bold`} href="/about">About us</a>
                                <a className={`${styles.text_accent} font-bold`} href="/contact">Contact us</a>
                                <a className={`${styles.text_accent} font-bold`} href="/services">Services</a>
                                <a className={`${styles.text_accent} font-bold`} href="/pricing">Pricing</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            <div className={`${styles.bg_niagara} flex justify-center items-center text-white h-[64px]`}>
                © 2022 FrostCity - All Rights Reserved
            </div>
        </div>

    )
}

export default Footer