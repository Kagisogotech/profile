import React, { useState, useEffect } from 'react';
import { SocialLinks } from './SocialLinks';

interface HeroSectionProps {
    scrollY: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => {
    const [text, setText] = useState('');
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [delta, setDelta] = useState(200 - Math.random() * 100);

    const rolesToRotate = ["Front-end Developer"];
    const period = 2000;

    useEffect(() => {
        const tick = () => {
            const i = loopNum % rolesToRotate.length;
            const fullText = rolesToRotate[i];
            const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

            setText(updatedText);

            if (isDeleting) {
                setDelta(prevDelta => prevDelta / 2);
            }

            if (!isDeleting && updatedText === fullText) {
                setIsDeleting(true);
                setDelta(period);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setDelta(500);
            }
        };

        const ticker = setTimeout(() => {
            tick();
        }, delta);

        return () => { clearTimeout(ticker); };
    }, [text, delta, isDeleting, loopNum, rolesToRotate]);
    
    return (
        <section
            id="hero"
            className="h-screen flex items-center justify-center text-center relative overflow-hidden"
            style={{ willChange: 'transform' }}
        >
            <div
                className="absolute inset-0 bg-black/50"
                style={{
                    transform: `translateY(${scrollY * 0.4}px) scale(1.1)`,
                    willChange: 'transform',
                }}
            />
            <div className="z-10 relative px-4">
                <h1 className="text-6xl md:text-8xl lg:text-8xl font-anton uppercase tracking-widest mb-4 animate-fade-in">
                    Kagiso Monene<span className="text-cyan-400">.</span>
                </h1>
                <h2 className="text-lg text-white h-7 animate-fade-in [animation-delay:200ms]">
                    {text}<span className="border-r-2 border-white animate-pulse" aria-hidden="true"></span>
                </h2>
                <p className="text-lg md:text-2xl text-neutral-300 max-w-3xl mx-auto mt-4 animate-fade-in [animation-delay:400ms]">
                    A tech creator turning ideas into interactive web experiences and AI-powered tools. I make learning smarter, digital solutions simpler, and projects that leave an impact. Dive in and see what's possible.
                </p>
                <div className="mt-8 animate-fade-in [animation-delay:600ms]">
                    <SocialLinks iconSize="w-8 h-8" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
