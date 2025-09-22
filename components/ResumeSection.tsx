
import React from 'react';

const ResumeSection: React.FC = () => {
    return (
        <section id="resume" className="py-20 md:py-32 bg-neutral-900/50">
            <div className="max-w-screen-md mx-auto px-8 text-center">
                <h2 className="text-4xl md:text-6xl font-anton uppercase mb-16">My Resume</h2>
                <div className="mb-10">
                    <iframe
                        src="docs/Kagiso_Monenes CV.pdf"
                        title="Kagiso Monene's Resume Preview"
                        className="rounded-lg shadow-2xl border-4 border-neutral-800 mx-auto w-full max-w-lg"
                        style={{ minHeight: '500px' }}
                    />
                </div>
                <a 
                    href="docs/Kagiso_Monenes CV.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center group mx-auto w-fit"
                >
                    Download Resume
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </a>
            </div>


        </section>
    );
};

export default ResumeSection;
