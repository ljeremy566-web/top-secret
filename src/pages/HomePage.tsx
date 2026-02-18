import Header from '../components/common/Header';
import HeroSection from '../components/common/HeroSection';
import ServicesSection from '../components/common/ServicesSection';
import PromotionSection from '../components/common/PromotionSection';
import TintOptionsSection from '../components/common/TintOptionsSection';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF9F1C] selection:text-black relative">
            {/* Iluminación suave de fondo */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse at center 30%, rgba(255, 159, 28, 0.05) 0%, transparent 70%)',
                }}
            />
            <div className="relative z-10">

                <Header />
                <HeroSection />
                <ServicesSection />
                <TintOptionsSection />
                <PromotionSection />
            </div>
        </div>
    );
};

export default HomePage;
