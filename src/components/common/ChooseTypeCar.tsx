import { useState, useEffect } from 'react'
import Coupe from '../../images/Coupe.png'
import Sedan from '../../images/Sedan.png'
import Suv from '../../images/Suv.png'

interface CardCarType {
    name: string;
    image: string;
}

const CardCarType = ({ name, image }: CardCarType) => {
    return (
        <div className="relative group cursor-pointer w-[250px] h-[250px] md:w-[320px] md:h-[320px] overflow-hidden bg-[#222]">
            {/* Background image */}
            {/* Background image */}
            {image && (
                <img
                    src={image}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-500 brightness-225"
                    loading="lazy"
                />
            )}

            {/* Warm dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

            {/* Name label */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <h3 className="text-[#FF9F1C] text-3xl md:text-4xl font-black uppercase tracking-wider group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {name}
                </h3>
            </div>

            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF9F1C]/40 transition-all duration-500 z-30" />
        </div>
    );
};

const ChooseTypeCar = () => {
    return (
        <>


            <section className="container mx-auto px-4 pb-20 pt-14">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl mt-25 md:text-5xl font-bold text-[#FF9F1C] group uppercase tracking-wider mb-4 relative inline-block">
                        Choose your car type
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#FF9F1C] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </h2>
                    <div className="w-24 h-1 bg-[#FF9F1C] rounded-full mt-2"></div>
                </div>


            </section>

            <section className="flex flex-wrap justify-center gap-12 px-4">
                <CardCarType
                    name='Coupe'
                    image={Coupe}
                />
                <CardCarType
                    name='SUV'
                    image={Suv}
                    
                />
                <CardCarType
                    name='Sedan'
                    image={Sedan}
                />
            </section>

        </>



    )
}

export default ChooseTypeCar
