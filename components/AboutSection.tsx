import React from 'react';

interface AboutSectionProps {
    aboutParallaxY: number;
    projectsCount: number;
    certificatesCount: number;
    modelAccuracy: number; // as a percentage, e.g., 95
}

const AboutSection = React.forwardRef<HTMLElement, AboutSectionProps>(
    ({ aboutParallaxY, projectsCount, certificatesCount, modelAccuracy }, ref) => {
        return (
            <section id="about" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
                <div 
                    className="absolute top-0 right-0 h-full w-1/2 bg-cover bg-center opacity-10"
                    style={{
                        backgroundImage: "url('images/img1.jpg')",
                        transform: `translateY(${aboutParallaxY}px)`,
                        willChange: 'transform'
                    }}
                />
                <div className="max-w-screen-xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-anton uppercase mb-6">Who is Kagiso?</h2>
                        <p className="text-neutral-400 mb-4">
                            I'm Kagiso 😁, a tech enthusiast with a passion for creating practical digital solutions. I specialize in front-end development and educational content generation using AI. My projects focus on turning complex problems into user-friendly experiences, from interactive web applications to smart tools that make learning easier.
                        </p>
                        <p className="text-neutral-400 mb-8">
                            I'm constantly exploring new technologies and innovative approaches to help people learn, create, and engage with digital content in meaningful ways.
                        </p>

                        {/* Stats Section */}
                        <div className="flex flex-col sm:flex-row gap-6 mt-8">
                            <div className="flex-1 bg-neutral-800/50 rounded-xl p-6 text-center shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                                <p className="text-3xl md:text-4xl font-bold text-emerald-400">5+</p>
                                <p className="text-neutral-300">Projects Completed</p>
                            </div>
                            <div className="flex-1 bg-neutral-800/50 rounded-xl p-6 text-center shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                                <p className="text-3xl md:text-4xl font-bold text-emerald-400">10+</p>
                                <p className="text-neutral-300 mt-5">Certificates</p>
                            </div>
                            <div className="flex-1 bg-neutral-800/50 rounded-xl p-6 text-center shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                                <p className="text-3xl md:text-4xl font-bold text-emerald-400">94%</p>
                                <p className="text-neutral-300 mt-5">Model Accuracy</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-96">
                        <img 
                        src="/images/img2.jpg" 
                        alt="Creative workspace" 
                        className="absolute bottom-20px right-0 w-2/3 h-3/3 
                        object-cover rounded-lg border-6 border-black 
                        shadow-lg 
                        transform transition-transform duration-500 ease-in-out
                        hover:scale-105 
                        hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] "
                    />
</div>

                </div>
            </section>
        );
    }
);

export default AboutSection;
