import React from 'react'

const WhyChooseUs = () => {

    const benefits = [
        "authorized dealer", "customer care 24/7", "free installation", "free delivery", "warranty", "maintenance", "cleaning", "repair"
    ]

    return (
        <section class="bg-white body-font">
            <div class="container px-5 py-20 mx-auto w-10/12">
                <div class="text-center">
                    <h1 class="sm:text-2xl text-xl font-black text-center title-font  mb-5">Why choose FROSTCITY over other?</h1>
                    {/* <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p> */}
                </div>
                <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                    {
                        benefits.map((x, index) => {
                            return (
                                <div key={index} class="p-2 sm:w-1/2 w-full">
                                    <div class="bg-gray-100 border rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-red-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span class="title-font font-medium uppercase">{x}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs