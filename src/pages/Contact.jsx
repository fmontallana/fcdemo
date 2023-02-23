import React from 'react'
import { useRef } from 'react';
import styles from '../style'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Contact = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        const promise = new Promise((resolve, reject) => {
            emailjs.sendForm('service_5f6fbca', 'template_x0jadbh', form.current, 'xck-ftJJqXWkfS7n5')
                .then((result) => {
                    console.log(result.text);
                    form.current.reset()
                    resolve(result)
                }, (error) => {
                    console.log(error.text);
                    reject(error)
                });
        })

        toast.promise(promise, {
            success: "Email sent!",
            pending: "Sending email...",
            error: "Sending email failed."
        })
    };



    return (
        <section class={`body-font relative`}>
            <div class={` absolute inset-0 `}>
                <iframe width="100%" height="100%" loading='lazy' frameBorder="0" marginHeight="0" marginWidth="0" title="map" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.843361080589!2d120.95764159999997!3d14.3205297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d54e4a3c4cc1%3A0xa81fd5d2455c2f63!2sFrostCity%20Airconditioning%20System%20Services!5e0!3m2!1sen!2sph!4v1670157815887!5m2!1sen!2sph" style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}></iframe>
            </div>
            <form ref={form} onSubmit={sendEmail} >
                <div class={`${styles.paddingX} container px-5 py-12 mx-auto flex`}>
                    <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <h2 class=" text-lg mb-1 font-medium title-font">Get in Touch</h2>
                        <p class="leading-relaxed mb-5 text-gray-600">Let's start a conversation. Send us your inquiries or give some feedback.</p>
                        <input className='hidden' type="text" name="to_name" value="Frostcity" />
                        <div class="relative mb-2">
                            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" id="from_name" name="from_name" class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="relative mb-2">
                            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="from_email" name="from_email" class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="relative mb-2">
                            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                            <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        <button type="submit" value="Send" class={`text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg`}>Submit</button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Contact