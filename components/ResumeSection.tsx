
import React from 'react';

const ResumeSection: React.FC = () => {
    return (
        <section id="resume" className="py-20 md:py-32 bg-neutral-900/50">
            <div className="max-w-screen-md mx-auto px-8 text-center">
                <h2 className="text-4xl md:text-6xl font-anton uppercase mb-16">My Resume</h2>
                <div className="mb-10">
                    <iframe
                        src="/Kagiso_CV_.pdf"
                        title="Kagiso Monene's Resume Preview"
                        className="rounded-lg shadow-2xl border-4 border-neutral-800 mx-auto w-full max-w-lg"
                        style={{ minHeight: '500px' }}
                    />
                </div>
            </div>


        </section>
    );
};

export default ResumeSection;
