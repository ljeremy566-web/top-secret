import { useState, useEffect } from 'react';

const words: string[] = ["legacy", "statement", "masterpiece"];

const HeroAnimation = () => {
    const [index, setIndex] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setIsVisible(true);
            }, 500);
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <span className="inline-grid grid-cols-1 justify-items-center md:justify-items-start align-bottom px-1">
            {/* Invisible ghost element to reserve space for the longest word */}
            <span className="invisible col-start-1 row-start-1 font-bold">masterpiece.</span>

            {/* Animated text overlay */}
            <span
                className={`col-start-1 row-start-1 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} text-[#FF9F1C] font-bold not-italic`}
            >
                {words[index]}.
            </span>
        </span>
    );
};

export default HeroAnimation;
