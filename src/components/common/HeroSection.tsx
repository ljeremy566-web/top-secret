import { Link } from 'react-router-dom';
import heroImg from '../../images/First-Image.png';
import HeroAnimation from './HeroAnimation';

const HeroSection = () => {
    return (
        <section className="relative w-full h-[500px] flex flex-col items-center justify-center text-center px-4 mt-20">
            {/* Imagen de Fondo */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10" />
                <img
                    src={heroImg}
                    alt="Vehículo siendo polarizado profesionalmente"
                    className="w-full h-full object-cover opacity-40"
                    loading="lazy"
                />
            </div>

            {/* Contenido */}
            <div className="relative z-20 flex flex-col items-center gap-10">
                <h2 className="text-3xl md:text-5xl italic font-light tracking-tight text-gray-200">
                    Make your window a{' '}
                    <HeroAnimation />
                </h2>

                <Link to="/schedule" className="bg-[#FF9F1C] hover:bg-[#e88e15] text-black italic text-xl font-black px-12 py-4 uppercase flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(255,159,28,0.3)] transition-all cursor-pointer tracking-wider transition-transform duration-300 hover:scale-110 ">
                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 18.4889V11.4111L8.63943 9.24444L0 7.02V0L18.9953 8.08889H16.3062C14.4563 8.08889 12.8543 8.7052 11.5002 9.93778C10.1461 11.1704 9.37367 12.7208 9.18297 14.5889L0 18.4889ZM16.3062 20.8C14.8186 20.8 13.5409 20.2665 12.4728 19.1996C11.4048 18.1326 10.8708 16.8422 10.8708 15.3284C10.8708 13.8147 11.4048 12.5185 12.4728 11.44C13.5409 10.3615 14.8186 9.82222 16.3062 9.82222C17.7938 9.82222 19.0716 10.3602 20.1396 11.4362C21.2076 12.5121 21.7416 13.8133 21.7416 15.34C21.7416 16.8505 21.2076 18.1382 20.1396 19.203C19.0716 20.2677 17.7938 20.8 16.3062 20.8ZM18.3087 18.3156L19.1383 17.42L16.7925 15.0511V11.5844H15.6196V15.6104L18.3087 18.3156Z" fill="black" />
                    </svg>

                    Schedule Now
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
