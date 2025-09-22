import React, { useState } from 'react';

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<{ email?: string; name?: string; message?: string }>({});

    // Email validation function
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }
        
        // Check for valid domain (has a dot after the @)
        const domain = email.split('@')[1];
        if (!domain || domain.indexOf('.') === -1) {
            return false;
        }
        
        // Check for common fake email patterns
        const fakeEmailPatterns = [
            'example.com',
            'example.org',
            'test.com',
            'fake.com',
            'temp.com',
            'domain.com',
            'mail.com',
            'user.com'
        ];
        
        if (fakeEmailPatterns.some(pattern => pattern.test(domain))) {
            return false;
        }
        
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { email?: string; name?: string; message?: string } = {};
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address with a proper domain';
        }
        
        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message should be at least 10 characters long';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setStatus('sending');
        
        try {
            const response = await fetch("https://formspree.io/f/movkalkv", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            });
            
            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                
                // Reset status after a few seconds
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            
            // Reset status after a few seconds
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-32">
            <div className="max-w-screen-md mx-auto px-8">
                <h2 className="text-4xl md:text-6xl font-anton uppercase text-center mb-16">Get In Touch</h2>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={`block w-full bg-neutral-800 border rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                                errors.name ? 'border-red-500' : 'border-neutral-700'
                            }`}
                            placeholder="Your Name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-400 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                </svg>
                                {errors.name}
                            </p>
                        )}
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`block w-full bg-neutral-800 border rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                                errors.email ? 'border-red-500' : 'border-neutral-700'
                            }`}
                            placeholder="your.email@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                </svg>
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows={5}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className={`block w-full bg-neutral-800 border rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                                errors.message ? 'border-red-500' : 'border-neutral-700'
                            }`}
                            placeholder="How can I help you?"
                        />
                        {errors.message && (
                            <p className="mt-1 text-sm text-red-400 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                </svg>
                                {errors.message}
                            </p>
                        )}
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black px-10 py-3 rounded-full text-base font-semibold transition-all duration-300 flex items-center group mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'sending' ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </div>
                </form>
                {status === 'success' && (
                    <div className="mt-6 text-center text-emerald-400 bg-emerald-900/50 p-4 rounded-lg animate-fade-in">
                        Thank you for your message! I'll get back to you soon.
                    </div>
                )}
                {status === 'error' && (
                    <div className="mt-6 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
                        There was an error sending your message. Please try again.
                    </div>
                )}
            </div>
        </section>
    );
};

export default ContactSection;
