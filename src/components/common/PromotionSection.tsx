import Marquee from 'react-fast-marquee';


interface PromotionCardsProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    barPosition: 'left' | 'right' | 'middle';

}

const PromotionCards = ({ title, description, imageSrc, imageAlt, }: PromotionCardsProps) => {
    if (!imageSrc) return null;
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-[#FF9F1C] text-xl md:text-2xl font-bold italic mb-8 tracking-wide">
                {title}
            </h3>

            <div className="relative w-full max-w-md aspect-[16/10] group cursor-pointer">
                {/* Barra naranja */}


                {/* Imagen */}
                <div className="w-full h-full bg-black-900 overflow-hidden relative brightness-290">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 "
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
};

export default function PromotionSection() {
    return (
        <>
            <section id="promotion" className="w-full mx-auto px-4 py-16 [filter:drop-shadow(0px_0px_10px_#FF9F1C)] border-[#FF9F1C] border overflow-x-hidden animate-pulse scale-105">
                <Marquee speed={120} className='overflow-hidden'>
                    <p className="text-5xl font-bold uppercase tracking-wider ml-16 text-transparent [-webkit-text-stroke:2px_#FF9F1C]">Promotions</p>
                    <p className="text-5xl text-[#FF9F1C] font-bold uppercase tracking-wider ml-16">Promotions</p>
                    <p className="text-5xl font-bold uppercase tracking-wider ml-16 text-transparent [-webkit-text-stroke:2px_#FF9F1C]">Promotions</p>
                    <p className="text-5xl text-[#FF9F1C] font-bold uppercase tracking-wider ml-16">Promotions</p>
                    <p className="text-5xl font-bold uppercase tracking-wider ml-16 text-transparent [-webkit-text-stroke:2px_#FF9F1C]">Promotions</p>
                    <p className="text-5xl text-[#FF9F1C] font-bold uppercase tracking-wider ml-16">Promotions</p>
                </Marquee>

            </section>

            <section>
                <PromotionCards
                    title=""
                    description=""
                    imageSrc=""
                    imageAlt=""
                    barPosition="left"
                />
            </section>
        </>
    );
}
