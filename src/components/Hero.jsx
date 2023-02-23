import React from 'react'
import Button from './Button'
import { BrandFacebook, BrandInstagram, BrandTiktok, BrandYoutube, MapPin } from 'tabler-icons-react';
import styles from '../style';
import photoGrid from "../assets/photo-grid.png";
import logo from '../assets/logo.png'
import aircon from '../assets/aircon.png'
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <>
            <div className={` h-full py-16 flex bg-center text-white text-sm `} style={{ backgroundImage: `url('${photoGrid}')` }}>
                <div className={` h-full flex-1 flex flex-col items-start justify-center gap-16 ${styles.paddingX}`}>
                    <div className={`space-y-6`}>
                        <p className='text-lg'>AIRCONDITIONING SERVICES</p>
                        <p className='font-bold text-2xl lg:text-4xl'>WELCOME TO FROST<span className={`${styles.text_wildRice}`}>CITY</span></p>
                        <p className='text-sm lg:text-lg'> Air conditioning services play a significant role in this modern world. From preserving commercial foods, and medicines, or to simply giving you a comfortable sleep after a long day. Every business or household needs a dependable partner for all their air conditioning needs. This led to the birth of today’s TOP Cavite and Laguna HVAC company – FROSTCITY.
                        </p>
                        <Button className={`flex-none`} url={'/services'} height="h-10">VIEW OUR SERVICES</Button>
                    </div>
                    <div className={`space-y-4`}>
                        <div className={`flex`}>
                            <a href={'https://www.facebook.com/frostcitycavite'} target={'_blank'} rel='noopener noreferrer'>
                                <BrandFacebook size={35} strokeWidth={2} />
                            </a>
                            {/* <a href={'ig.com'} target={'_blank'} rel='noopener noreferrer'>
                                <BrandInstagram size={35} strokeWidth={2} />
                            </a> */}
                            <a href={'https://www.tiktok.com/@frostcityph'} target={'_blank'} rel='noopener noreferrer'>
                                <BrandTiktok size={35} strokeWidth={2} />
                            </a>
                            <a href={'https://www.youtube.com/@nicolocco28'} target={'_blank'} rel='noopener noreferrer'>
                                <BrandYoutube size={35} strokeWidth={2} />
                            </a>
                        </div>
                        <div>
                            <a className='flex justify-center items-center' href="https://goo.gl/maps/bevvTS63xxESogd7A">
                                <MapPin size={24} strokeWidth={1.5} />
                                <p>Blk 38 Lot 10 Brgy. Fatima II, Sta Maria, Dasmariñas, 4115 Cavite</p>
                            </a>
                        </div>
                    </div>


                </div>
                <div className={`hidden flex-1 justify-self-start sm:flex flex-col items-center justify-center gap-10 overflow-hidden`}>
                    <div className='w-64'>
                        <img src={logo} alt="brand logo with caption" />
                    </div>
                    <div className='w-96'>
                        <img src={aircon} alt="aircon" />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Hero