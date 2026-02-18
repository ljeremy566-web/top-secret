import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import ChooseTypeCar from '../components/common/ChooseTypeCar';

interface ServiceDetail {
    title: string;
    description: string;
    image: string;
    features: string[];
}

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
            <ChooseTypeCar />
        </div>
    );
};

export default ServicesPage;



