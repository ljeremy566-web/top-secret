import serviceImage from '../../images/serviceImage.png'

interface ServiceCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    barPosition: 'left' | 'right';
}

const ServiceCard = ({ title, barPosition }: ServiceCardProps) => {
    const isLeft = barPosition === 'left';

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-[#FF9F1C] text-xl md:text-2xl font-bold italic mb-8 tracking-wide">
                {title}
            </h3>

            <div className="relative w-full max-w-md aspect-[16/10] group cursor-pointer">
                {/* Barra naranja */}
                <div
                    className={`absolute ${isLeft ? 'left-0' : 'right-0'} top-0 bottom-0 w-1.5 bg-[#FF9F1C] z-20`}
                />

                {/* Imagen */}
                <div className="w-full h-full bg-black-900 overflow-hidden relative brightness-290">
                    <img
                        src={serviceImage}
                        alt={serviceImage}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28">
                <ServiceCard
                    title="Mobile Services"
                    imageSrc="https://images.unsplash.com/photo-1632823469850-24a05f96a843?q=80&w=2070&auto=format&fit=crop"
                    imageAlt="Servicio móvil de polarizado a domicilio"
                    barPosition="left"
                />
                <ServiceCard
                    title="Full Car Tint"
                    imageSrc="https://images.unsplash.com/photo-1605218427306-022ba8c932a9?q=80&w=2066&auto=format&fit=crop"
                    imageAlt="Polarizado completo de vehículo"
                    barPosition="right"
                />
            </div>
        </section>
    );
};

export default ServicesSection;
