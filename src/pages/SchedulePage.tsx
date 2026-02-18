

import Header from '../components/common/Header';

const SchedulePage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF9F1C] selection:text-black">
            {/* Background shared with Home */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse at center 30%, rgba(255, 159, 28, 0.05) 0%, transparent 70%)',
                }}
            />

            <Header />


        </div>
    );
};

export default SchedulePage;
