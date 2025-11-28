import React from 'react';
import { Shield, Zap, Leaf, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    const pillars = [
        {
            icon: <Shield className="w-4 h-4 text-white/60" />,
            title: "Automated Proof of Collateral (APoC)",
            description: "A system where the value of collateral is programmed to always equal or exceed the value of minted QNT, ensuring ever-present liquidity and redeemability."
        },
        {
            icon: <Zap className="w-4 h-4 text-white/60" />,
            title: "Engineered for Growth",
            description: "A patented system designed for stable, predictable value growth of QNT."
        },
        {
            icon: <Leaf className="w-4 h-4 text-white/60" />,
            title: "Sustainable Yield Source",
            description: "Real revenue generated from proven, market-neutral trading strategies."
        },
        {
            icon: <Scale className="w-4 h-4 text-white/60" />,
            title: "Fairness & Transparency",
            description: "Aligning incentives to benefit all protocol participants."
        }
    ];

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-background relative">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Side - Text Content */}
                    <div className="space-y-6">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-blue-400 font-semibold tracking-wider uppercase text-sm block"
                        >
                            About Quintes
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                        >
                            Redefining Value Accrual <br />
                            <span className="text-white/90">for the Digital Age.</span>
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <p className="text-base text-primary-100/70 leading-relaxed max-w-xl">
                                Quintes Protocol is a next-generation financial infrastructure built to solve the core failures of DeFi and traditional finance: volatility, unsound incentives, and inaccessible yield.
                            </p>
                            <p className="text-base text-primary-100/70 leading-relaxed max-w-xl">
                                We provide a sophisticated yet simple platform for you to securely stake your BTC, ETH, and stablecoins and earn superior, sustainable returns.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <p className="text-base text-primary-100/70 leading-relaxed max-w-xl">
                                Our primary asset, QNT, is always fully backed and overcollateralized (minimum 200%) by a diversified pool of high-quality digital assets, making it redeemable at any time.
                            </p>
                            <p className="text-base text-primary-100/70 leading-relaxed max-w-xl">
                                We leverage patented crypto-economic mechanisms and deploy capital through proven, Shariah-compliant strategies via institutional-grade infrastructure, ensuring both stability and consistent long-term value accrual.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Side - Cards Grid 2x2 */}
                    <div className="grid grid-cols-2 gap-4 auto-rows-fr">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                                className="glass-morphism p-5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden h-full flex flex-col"
                            >
                                {/* Subtle Glow Effect on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                                <div className="relative z-10 flex-1 flex flex-col">
                                    <div className="mb-3 p-2 rounded-lg bg-white/5 w-fit group-hover:bg-blue-500/10 transition-all duration-300">
                                        {pillar.icon}
                                    </div>
                                    <h3 className="text-sm font-semibold text-white mb-2 leading-tight min-h-[2.5em]">{pillar.title}</h3>
                                    <p className="text-xs text-primary-100/60 leading-relaxed flex-1">
                                        {pillar.description}
                                    </p>
                                </div>

                                {/* Shimmer Effect */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
