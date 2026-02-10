import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../../images/Logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="w-full h-16 px-4 md:px-8 flex items-center justify-between relative z-50 pt-4 md:pt-15">
            {/* Logo */}
            <div className="cursor-pointer z-50">
                <img
                    src={logoImg}
                    alt="Legacy Window Tinting"
                    className="h-12 md:h-16 lg:h-40 w-auto object-contain transition-all duration-300"
                />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
                <div className="flex gap-10 text-xs font-semibold tracking-widest text-white uppercase">
                    <a href="#contact" className="hover:text-[#FF9F1C] transition-colors">
                        Contact Us
                    </a>
                    <a href="#services" className="hover:text-[#FF9F1C] transition-colors">
                        Services
                    </a>
                </div>

                <button className="border-2 border-[#FF9F1C] bg-transparent hover:bg-[#FF9F1C] text-white hover:text-black text-xs font-black px-5 py-2 tracking-widest uppercase transition-all cursor-pointer">
                    Schedule Now
                </button>

                <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contactar por WhatsApp"
                    className="flex items-center justify-center w-14 h-14 transition-transform duration-300 hover:scale-110"
                >
                    <svg width="60" height="60" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-14 md:h-14">
                        <g filter="url(#filter0_d_10_14)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M35.2952 18.8C44.296 18.7925 51.8 26.3115 51.8 35.2949C51.8 44.2858 44.296 51.7824 35.2952 51.7774C32.9298 51.7787 30.5917 51.2725 28.4387 50.293L20.2696 51.7699C20.0528 51.8097 19.8293 51.7911 19.622 51.7161C19.4147 51.6412 19.2309 51.5126 19.0896 51.3434C18.9483 51.1742 18.8544 50.9705 18.8176 50.7532C18.7807 50.5358 18.8022 50.3126 18.8799 50.1063L21.221 43.8849C19.6438 41.2961 18.8081 38.3238 18.8052 35.2924C18.8077 26.309 26.3043 18.805 35.2952 18.8ZM43.5762 42.3009C41.7407 43.7852 38.899 45.2845 36.1818 43.5412C32.6203 41.2523 29.4673 38.2462 27.1809 34.6823C25.8385 32.5952 27.1012 29.2529 28.9891 27.2156C29.7412 26.4012 30.9815 26.5307 31.8009 27.2778L33.5244 28.8519C34.0474 29.3301 34.0673 30.1619 33.741 30.7945C33.2255 31.7857 32.9217 33.1182 33.5592 34.1119C34.3612 35.3572 35.3475 36.585 37.7035 37.2998C38.4158 37.519 39.3298 37.4244 40.1069 37.1105C40.7569 36.8465 41.5813 36.849 42.062 37.3621L43.6659 39.0681C44.55 40.0096 44.5799 41.4889 43.5762 42.3009Z" fill="#FF960D" />
                        </g>
                        <defs>
                            <filter id="filter0_d_10_14" x="4.86374e-05" y="-4.76837e-06" width="70.6" height="70.5903" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feMorphology radius="5" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_10_14" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="6.9" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.588235 0 0 0 0 0.0509804 0 0 0 0.02 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_14" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10_14" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden z-50">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white p-2 hover:text-[#FF9F1C] transition-colors"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold text-white hover:text-[#FF9F1C] uppercase tracking-widest transition-colors"
                >
                    Contact Us
                </a>
                <a
                    href="#services"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold text-white hover:text-[#FF9F1C] uppercase tracking-widest transition-colors"
                >
                    Services
                </a>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="border-2 border-[#FF9F1C] bg-transparent hover:bg-[#FF9F1C] text-white hover:text-black text-xl font-black px-8 py-3 tracking-widest uppercase transition-all"
                >
                    Schedule Now
                </button>
            </div>
        </nav>
    );
};

export default Header;

