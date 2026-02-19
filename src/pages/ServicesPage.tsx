import Header from '../components/common/Header';
import TintBookingSystem from '../components/TintBookingSystem';

const ServicesPage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF9F1C] selection:text-black relative">
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse at center 30%, rgba(255, 159, 28, 0.05) 0%, transparent 70%)',
                }}
            />
            <Header />

            {/* 2. AQUÍ ESTÁ EL CAMBIO CLAVE */}
            {/* Título opcional para dar contexto */}
            <div className="pt-32 pb-8 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-4">
                    Select Your <span className="text-[#FF9F1C]">Service</span>
                </h1>
            </div>

            {/* Este componente renderiza TODO: Carros -> Precios -> Iframe de Square */}
            <TintBookingSystem />

        </div>
    );
};

export default ServicesPage;
