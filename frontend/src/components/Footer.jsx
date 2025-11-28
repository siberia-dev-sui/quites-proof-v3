import React, { useState } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import SignupOptions from './SignupOptions';

const Footer = () => {
    const [email, setEmail] = useState('');

    const scrollToSection = (sectionId) => {
        console.log('Attempting to scroll to:', sectionId);
        const id = sectionId.toLowerCase();
        const element = document.getElementById(id);
        if (element) {
            console.log('Element found:', element);
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.warn(`Section with id "${id}" not found`);
        }
    };

    return (
        <footer className="relative z-50 min-h-screen flex items-center justify-center py-20 animate-in fade-in-0 duration-1000 delay-500 bg-black/20 backdrop-blur-lg border-t border-white/5">
            <div className="container mx-auto px-8 space-y-12 text-center">

                {/* Newsletter / Signup Options Section */}
                <SignupOptions />

                <div className="w-full h-px bg-white/5 max-w-2xl mx-auto"></div>

                {/* Logo */}
                <div className="flex justify-center gap-x-3 items-center pt-8">
                    <img alt="quintes logo" width="40" height="40" src="/logo-light.svg" />
                    <img alt="quintes typeface" width="120" height="12" src="/quintes-logo-type.svg" />
                </div>

                {/* Navigation Links */}
                <div className="gap-6 items-center flex-wrap flex justify-center">
                    {['Home', 'About', 'Strategy', 'Contributors', 'FAQ'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className="text-primary-100/70 text-base font-sans tracking-tight hover:text-white transition-all duration-300 hover:scale-105"
                        >
                            {item}
                        </button>
                    ))}
                    <a
                        href="https://quintes.gitbook.io/quintes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-100/70 text-base font-sans tracking-tight hover:text-white transition-all duration-300 hover:scale-105"
                    >
                        Docs
                    </a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-x-6 items-center justify-center">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/quintesqnt/?viewAsMember=true" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                        <Linkedin size={22} />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/8ub3cJPwcR" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1569 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                        </svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://t.me/QuintesOfficial" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://x.com/Quintesorg" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                        <Twitter size={22} />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-center text-sm text-white/40">© 2024 Quintes. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
