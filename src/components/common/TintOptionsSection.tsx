import { useState } from 'react';
import CarWindow from './CarWindow';

interface TintOption {
    level: number;
    name: string;
    vlt: string;
    description: string;
}

const TINT_OPTIONS: TintOption[] = [
    { level: 0, name: 'Clear', vlt: '90%', description: 'Factory glass, no tint applied' },
    { level: 1, name: 'Light', vlt: '70%', description: 'Subtle UV protection, barely noticeable' },
    { level: 2, name: 'Medium', vlt: '35%', description: 'Most popular choice for everyday driving' },
    { level: 3, name: 'Dark', vlt: '20%', description: 'Strong privacy and heat rejection' },
    { level: 4, name: 'Limo', vlt: '5%', description: 'Maximum privacy, the darkest legal option' },
];

const TintOptionsSection = () => {
    const [selectedTint, setSelectedTint] = useState(0);

    return (
        <section className="container mx-auto px-4 py-20">
            {/* Section heading */}
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold italic text-white mb-3">
                    Choose Your <span className="text-[#FF9F1C]">Tint Level</span>
                </h2>
                <p className="text-gray-400 text-sm tracking-wider uppercase">
                    See the difference in real time
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
                {/* Car window preview */}
                <div className="flex-shrink-0">
                    <CarWindow tintLevel={selectedTint} />
                </div>

                {/* 2. Selector de Niveles (Options) */}
                <div className="w-full lg:w-1/3 order-2 flex flex-col justify-center">
                    <div className="text-xs font-bold text-gray-500 mb-4 tracking-widest uppercase hidden lg:block">
                        Premium Tinting
                    </div>

                    {/* Container responsivo: Horizontal Scroll en Móvil / Vertical Stack en Desktop */}
                    <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory px-4 lg:px-0 -mx-4 lg:mx-0 scrollbar-hide">
                        {TINT_OPTIONS.map((option) => (
                            <button
                                key={option.level}
                                onClick={() => setSelectedTint(option.level)}
                                className={`
                                    relative group flex flex-col lg:flex-row items-center lg:items-start text-left
                                    p-4 md:p-5 rounded-xl border transition-all duration-300 min-w-[160px] lg:min-w-0 lg:w-full snap-center
                                    ${selectedTint === option.level
                                        ? 'bg-[#FF9F1C]/10 border-[#FF9F1C]'
                                        : 'bg-white/5 border-white/10 hover:border-white/30'
                                    }
                                `}
                            >
                                {/* Círculo indicador */}
                                <div className={`
                                    w-12 h-12 md:w-16 md:h-16 rounded-full mb-3 lg:mb-0 lg:mr-5 flex-shrink-0 border-2 shadow-lg
                                    ${selectedTint === option.level ? 'border-[#FF9F1C] scale-110' : 'border-gray-500 group-hover:border-white'}
                                    transition-all duration-300
                                `}
                                    style={{
                                        // Re-mapping the colors based on the original TINT_OPTIONS structure
                                        backgroundColor:
                                            option.level === 0 ? '#a5d8ff' :
                                                option.level === 1 ? '#6b9fc4' :
                                                    option.level === 2 ? '#3d6a8a' :
                                                        option.level === 3 ? '#1e3347' : '#0d1117',
                                        boxShadow: selectedTint === option.level ? '0 0 15px rgba(255,159,28,0.4)' : 'none'
                                    }}
                                />

                                {/* Info */}
                                <div className="flex-1 min-w-0 text-center lg:text-left">
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-1">
                                        <h3 className={`text-sm md:text-lg font-black italic uppercase tracking-wider ${selectedTint === option.level ? 'text-white' : 'text-gray-300'}`}>
                                            {option.name}
                                        </h3>
                                        <span className="text-[10px] md:text-xs font-bold text-[#FF9F1C] bg-[#FF9F1C]/10 px-2 py-0.5 rounded mt-1 lg:mt-0 lg:ml-2 inline-block">
                                            VLT {option.vlt}
                                        </span>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-gray-400 font-medium leading-relaxed line-clamp-2 md:line-clamp-none">
                                        {option.description}
                                    </p>
                                </div>

                                {/* Active Indicator (Desktop only usually, but good for focus) */}
                                {selectedTint === option.level && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#FF9F1C] rounded-full shadow-[0_0_10px_#FF9F1C] hidden lg:block" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default TintOptionsSection;
