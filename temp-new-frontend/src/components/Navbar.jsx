import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        const id = sectionId.toLowerCase();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="container mx-auto px-8 absolute w-full left-1/2 -translate-x-1/2 border-b h-20 flex items-center justify-between z-50 transition-colors duration-150 bg-transparent border-transparent">
            <div className="flex items-center gap-x-3 animate-in fade-in-0 duration-500">
                <img alt="quintes logo" width="32" height="32" src="/logo-light.svg" />
                <img alt="quintes typeface" width="100" height="10" src="/quintes-logo-type.svg" />
            </div>

            <div className="gap-x-4 items-center hidden md:flex absolute left-1/2 -translate-x-1/2">
                {['Home', 'About', 'Strategy', 'Contributors', 'FAQ'].map((item, index) => (
                    <div key={item} className="animate-in fade-in-0 slide-in-from-bottom-2 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                        <button
                            onClick={() => scrollToSection(item)}
                            className="text-primary-100/85 text-sm font-sans tracking-tight cursor-pointer hover:text-white transition-colors bg-transparent border-none outline-none"
                        >
                            {item}
                        </button>
                    </div>
                ))}
            </div>

            <div className="relative h-full items-center justify-center flex md:hidden p-1.5 cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <span className={`absolute p-2 cursor-pointer transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                    <Menu size={18} />
                </span>
                <span className={`absolute p-2 cursor-pointer transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <X size={18} />
                </span>
            </div>

            {/* Mobile Menu Overlay would go here, but keeping it simple for now as per original site behavior which seems to just toggle icon in this snippet */}
        </div>
    );
};

export default Navbar;
