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

    const rolesToRotate = ["Frontend Developer"];
    const period = 2000;

    useEffect(() => {
        const tick = () => {
            let i = loopNum % rolesToRotate.length;
            let fullText = rolesToRotate[i];
            let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

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

        let ticker = setTimeout(() => {
            tick();
        }, delta);

        return () => { clearTimeout(ticker); };
    }, [text, delta, isDeleting, loopNum]);
    return (
        <section
            id="hero"
            className="h-screen flex items-center justify-center text-center relative overflow-hidden"
            style={{ willChange: 'transform' }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                    backgroundImage: "url('images/img3-1.jpg')",
                    backgroundPosition: "top center",
                    transform: `translateY(${scrollY * 0.5}px) scale(1.05)`,
                    filter: 'blur(1px)',
                    willChange: 'transform, filter',
                }}
            />
            <div className="z-10 relative px-4">
                <h1 className="text-6xl md:text-8xl lg:text-8xl font-anton uppercase tracking-widest mb-4">
                    Kagiso Monene<span className="text-white-400">.</span>
                </h1>
                <h2 className="text-lg text-text-color dark:text-gray-300 h-7">{text}<span className="border-r-2 border-text-color dark:border-gray-300 animate-pulse" aria-hidden="true"></span></h2>
                <p className="text-lg md:text-2xl text-neutral-300 max-w-2xl mx-auto">
                    A tech creator turning ideas into interactive web experiences and AI-powered tools. I make learning smarter, digital solutions simpler, and projects that leave an impact. Dive in and see what's possible.
                </p>
                <div className="mt-8">
                    <SocialLinks iconSize="w-8 h-8" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
