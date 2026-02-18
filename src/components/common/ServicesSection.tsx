import serviceImage from '../../images/serviceImage.png'
import WindowTintImage from '../../images/WindowTintImage.png'
import AutomotiveWrapsImage from '../../images/AutomotiveWrapsImage.png'
import CommercialResidentialTintImage from '../../images/CommercialResidentialTintImage.png'

interface ServiceCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    barPosition: 'left' | 'right' | 'middle';
}

const ServiceCard = ({ title, imageSrc, imageAlt, barPosition }: ServiceCardProps) => {
    const isLeft = barPosition === 'left';
    const isMiddle = barPosition === 'middle';

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-[#FF9F1C] text-xl md:text-2xl font-bold italic mb-8 tracking-wide">
                {title}
            </h3>

            <div className="relative w-full max-w-md aspect-[16/10] group cursor-pointer">
                {/* Barra naranja */}
                <div
                    className={`absolute top-0 bottom-0 w-1.5 bg-[#FF9F1C] z-20 ${isMiddle ? '-translate-x-1/2' : (isLeft ? 'left-0' : 'right-0')
                        }`}
                />

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

const ServicesSection = () => {
    return (
        <section id="services" className="container mx-auto px-4 pb-20 pt-14">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-[#FF9F1C] group uppercase tracking-wider mb-4 relative inline-block">
                    SERVICES
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#FF9F1C] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </h2>
                <div className="w-24 h-1 bg-[#FF9F1C] rounded-full mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-16">
                <ServiceCard
                    title="Window Tint"
                    imageSrc={WindowTintImage}
                    imageAlt="Servicio móvil de polarizado a domicilio"
                    barPosition="left"
                />
                <ServiceCard
                    title="Automotive Wraps"
                    imageSrc={AutomotiveWrapsImage}
                    imageAlt="Polarizado completo de vehículo"
                    barPosition="right"
                />

                <ServiceCard
                    title="Chrome Delete"
                    imageSrc={serviceImage}
                    imageAlt=""
                    barPosition="left"
                />

                <ServiceCard
                    title="Comercial & Residential Tint"
                    imageSrc={CommercialResidentialTintImage}
                    imageAlt=""
                    barPosition="right"
                />

                <div className="md:col-span-2 flex justify-center">
                    <ServiceCard
                        title="Ceramic Coating"
                        imageSrc={serviceImage}
                        imageAlt=""
                        barPosition="middle"
                    />
                </div>

            </div>
        </section>
    );
};

export default ServicesSection;
