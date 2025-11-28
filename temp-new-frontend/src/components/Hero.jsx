import React from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, TrendingUp, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Globe from './Globe'; // Import the new Globe component

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <div className="container mx-auto px-8 z-10 relative flex flex-col items-center max-w-4xl gap-y-8 py-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-primary-50 text-3xl sm:text-4xl lg:text-5xl text-center font-medium font-sans tracking-tight leading-[115%] max-w-4xl"
                >
                    Safely Scale Your Crypto By <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] font-semibold">33%</span> Yearly Using Automated Proof of Collateral
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    className="leading-relaxed text-primary-100/80 text-base sm:text-lg text-center max-w-2xl"
                >
                    Deposit BTC, ETH, or stablecoins to mint QNT—our yield-bearing stable asset engineered for consistent value growth through patented crypto-economic mechanisms.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="group relative w-max cursor-pointer outline-none text-sm sm:text-base"
                >
                    <div className="move-on-path h-8 w-12 translate-y-1/3 rounded-full bg-primary-400/40 blur-lg transition-colors group-hover:bg-primary-300/40"></div>
                    <div className="relative w-max overflow-hidden rounded-full bg-primary-900/40 p-0.5">
                        <div className="move-on-path h-16 w-24 rounded-full bg-primary-500 blur-lg transition-colors group-hover:bg-primary-400"></div>
                        <div className="relative rounded-full bg-[#0e0d2efd] px-8 py-3 text-primary-200 transition-all">
                            Start Growing Your Crypto
                        </div>
                    </div>
                </motion.button>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Original Background Image */}
                <img
                    id="hero-image"
                    alt="hero image"
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                    src="/hero-bg.png"
                />

                {/* Globe with Blending - Institutional Contrast */}
                <div className="absolute inset-0 mix-blend-screen opacity-100">
                    <Globe />
                </div>

                {/* Gradient Overlay for depth - Reduced intensity */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"></div>
            </div>
        </section>
    );
};

export default Hero;
