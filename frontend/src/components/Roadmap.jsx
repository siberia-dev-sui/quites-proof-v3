import React from 'react';
import { Map } from 'lucide-react';
import { motion } from 'framer-motion';

const Roadmap = () => {
    const phases = [
        {
            phase: "Phase 1",
            status: "Completed",
            items: ["Extensive R&D", "Core Mechanism Design & Patenting", "Initial Simulations & Verifications"]
        },
        {
            phase: "Phase 2",
            status: "Current Focus",
            items: ["Protocol Development", "Testnet Launch", "Initial Strategic Partnerships", "Community Building"]
        },
        {
            phase: "Phase 3",
            status: "Target Q4 2025",
            items: ["Mainnet Launch & TGE", "Scaled Collateral Deployment", "Broad User Onboarding"]
        },
        {
            phase: "Phase 4",
            status: "Future",
            items: ["Multi-Chain Expansion", "Real-World Asset (RWA) Integration", "Mobile Application", "Decentralized Governance Evolution"]
        }
    ];

    return (
        <section className="py-24 md:py-48">
            <div className="container mx-auto px-4 space-y-12 flex flex-col items-center">
                <div className="space-y-6 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-fit text-xs rounded-full px-2.5 py-1 glass-morphism text-primary-200 flex items-center gap-x-2"
                    >
                        <Map size={12} />
                        Our Journey
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-semibold text-primary-50 text-3xl xl:text-5xl leading-120% tracking-tighter text-center max-w-3xl"
                    >
                        Building the Future of Sustainable Yield, Step by Step
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {phases.map((phase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + (index * 0.15), ease: "easeOut" }}
                            className="glass-morphism p-6 rounded-xl space-y-4 h-full"
                        >
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-primary-50">{phase.phase}</h3>
                                <p className="text-sm text-primary-300">{phase.status}</p>
                            </div>
                            <ul className="space-y-2">
                                {phase.items.map((item, i) => (
                                    <li key={i} className="text-sm text-primary-100 flex items-start gap-2">
                                        <span className="text-primary-400 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
