import { ArrowRight, ArrowLeft, MapPin, Warehouse, Check, Loader2 } from 'lucide-react';
import { useTintBooking } from '../hooks/useTintBooking';
import { type TintServiceItem } from '../services/tintService';

import CoupeImg from '../images/Coupe.png';
import SedanImg from '../images/Sedan.png';
import SuvImg from '../images/SUV.png';

const TintBookingSystem = () => {
    const {
        view, setView,
        carType, setCarType,
        mode, setMode,
        cart, toggleCartItem,
        total,
        loading,
        carbonServices,
        ceramicServices
    } = useTintBooking();

    const renderServiceList = (items: TintServiceItem[]) => (
        <div className="flex flex-col gap-1">
            {items.map((item) => {
                const isSelected = cart.some((i) =>
                    i.db_price_id ? i.db_price_id === item.db_price_id : (i.name === item.name && i.category === item.category)
                );
                return (
                    <div
                        key={item.db_price_id}
                        onClick={() => toggleCartItem(item)}
                        className={`flex justify-between items-center p-3 border-b border-gray-800 cursor-pointer transition-colors hover:bg-white/5 ${isSelected ? 'bg-white/10' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-[#FF9F1C] border-[#FF9F1C] text-black' : 'border-gray-600'}`}>
                                {isSelected && <Check size={14} strokeWidth={4} />}
                            </div>
                            <span className={isSelected ? 'text-white font-medium' : 'text-gray-400'}>{item.name}</span>
                        </div>
                        <span className={`font-mono ${isSelected ? 'text-[#FF9F1C] font-bold' : 'text-gray-500'}`}>
                            ${item.price}
                        </span>
                    </div>
                );
            })}
        </div>
    );

    // =========================================================
    // VISTA 1: SELECCIÓN
    // =========================================================
    if (view === 'selection') {
        return (
            <div className="max-w-5xl mx-auto px-4 py-12">

                {/* 1. Selector de Auto */}
                {/* 1. Selector de Auto - Rediseñado estilo 'Large Cards' */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#FF9F1C] mb-8 tracking-wide">
                        Choose your type of car:
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 px-4">
                        {[
                            { id: 'sedan', img: SedanImg, label: 'SEDAN' },
                            { id: 'suv', img: SuvImg, label: 'SUV' },
                            { id: 'coupe', img: CoupeImg, label: 'COUPE' },
                        ].map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setCarType(c.id as 'coupe' | 'sedan' | 'suv')}
                                className={`relative group w-[220px] h-[220px] md:w-[260px] md:h-[260px] transition-all duration-300 ${carType === c.id
                                    ? 'scale-105 ring-4 ring-[#FF9F1C] shadow-[0_0_30px_rgba(255,159,28,0.4)] z-10'
                                    : 'opacity-60 hover:opacity-100 hover:scale-105 hover:z-10'
                                    }`}
                            >
                                {/* Imagen de fondo */}
                                <img
                                    src={c.img}
                                    alt={c.label}
                                    className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-500"
                                />

                                {/* Texto Centrado */}
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <h3 className={`text-4xl md:text-5xl font-black uppercase tracking-wider drop-shadow-lg transition-colors ${carType === c.id ? 'text-[#FF9F1C]' : 'text-white group-hover:text-[#FF9F1C]'
                                        }`}>
                                        {c.label}
                                    </h3>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Selector de Modo */}
                <div className="mb-12 flex justify-center">
                    <div className="bg-[#1a1a1a] p-1 rounded-lg flex border border-gray-800">
                        <button
                            onClick={() => setMode('shop')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${mode === 'shop' ? 'bg-[#FF9F1C] text-black font-bold' : 'text-gray-400'}`}
                        >
                            <Warehouse size={18} /> <span>In-Shop</span>
                        </button>
                        <button
                            onClick={() => setMode('mobile')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${mode === 'mobile' ? 'bg-[#FF9F1C] text-black font-bold' : 'text-gray-400'}`}
                        >
                            <MapPin size={18} /> <span>Mobile</span>
                        </button>
                    </div>
                </div>

                {/* 3. Listas de Precios (Con Loading) */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-[#FF9F1C]" size={48} />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-12 mb-24">
                        {/* Carbon */}
                        <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                            <h2 className="text-2xl font-black text-white mb-4 border-b-2 border-gray-700 pb-2 uppercase italic">
                                Carbon Tint
                            </h2>
                            {renderServiceList(carbonServices)}
                        </div>
                        {/* Ceramic */}
                        <div className="bg-[#111] p-6 rounded-xl border border-[#FF9F1C]/30 relative">
                            <div className="absolute top-0 right-0 bg-[#FF9F1C] text-black text-[10px] font-bold px-2 py-1 uppercase rounded-bl">Best Choice</div>
                            <h2 className="text-2xl font-black text-[#FF9F1C] mb-4 border-b-2 border-[#FF9F1C]/30 pb-2 uppercase italic">
                                Ceramic Tint
                            </h2>
                            {renderServiceList(ceramicServices)}
                        </div>
                    </div>
                )}

                {/* Barra Total Flotante */}
                <div className="fixed bottom-0 left-0 w-full bg-[#1a1a1a] border-t border-[#FF9F1C] p-4 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
                    <div className="max-w-5xl mx-auto flex justify-between items-center">
                        <div>
                            <p className="text-gray-400 text-xs uppercase">Estimated Total</p>
                            <p className="text-3xl font-black text-white">${total}</p>
                        </div>
                        <button
                            disabled={cart.length === 0}
                            onClick={() => setView('booking')}
                            className="bg-[#FF9F1C] hover:bg-white text-black font-black uppercase tracking-widest px-8 py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            Book Now <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =========================================================
    // VISTA 2: RESERVA SQUARE (iframe)
    // =========================================================
    if (view === 'booking') {
        const mainService = cart[0];
        const serviceIdParam = mainService?.squareId ? `?serviceId=${mainService.squareId}` : '';
        const bookingUrl = `https://square.site/book/LSV7HNEXSK93D/nan9pdck4sh1qp${serviceIdParam}`;

        return (
            <div className="max-w-5xl mx-auto px-4 py-12">
                <button
                    onClick={() => setView('selection')}
                    className="text-gray-400 hover:text-white flex items-center gap-2 mb-8"
                >
                    <ArrowLeft size={20} /> Back to Selection
                </button>
                <div className="bg-white rounded-xl overflow-hidden shadow-2xl h-[800px]">
                    <iframe
                        src={bookingUrl}
                        title="Book Appointment"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                </div>
            </div>
        );
    }

    return null;
};

export default TintBookingSystem;
