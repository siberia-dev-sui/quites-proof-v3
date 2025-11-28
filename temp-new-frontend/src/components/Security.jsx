import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Security = () => {
    const features = [
        "Rigorous Smart Contract Audits",
        "Robust Over-collateralization (200%)",
        "Efficient Liquidations",
        "Unwavering Peg Stability",
        "Institutional-Grade Custody",
        "Reliable Oracles",
        "Strong Governance & OpSec",
        "Continuous Monitoring",
        "Financial Backstops",
        "Emergency Protocols"
    ];

    return (
        <section className="py-24 md:py-48 bg-gradient-to-b from-transparent to-primary-950/20">
            <div className="container mx-auto px-4 space-y-8 flex flex-col items-center">
                <div className="space-y-6 flex flex-col items-center max-w-4xl w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-fit text-xs rounded-full px-2.5 py-1 glass-morphism text-primary-200 flex items-center gap-x-2"
                    >
                        <ShieldCheck size={12} />
                        Security First
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-semibold text-primary-50 text-3xl xl:text-5xl leading-120% tracking-tighter text-center"
                    >
                        Engineered for Resilience, Built on Trust
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="leading-150% tracking-normal text-primary-100 text-base xl:text-lg text-center"
                    >
                        When you stake your assets with Quintes, their security is paramount. Our multi-layered approach, which we call Automated Proof of Collateral (APoC), includes:
                    </motion.p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 w-full">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 + (index * 0.05), ease: "easeOut" }}
                                className="glass-morphism p-4 rounded-lg text-center flex items-center justify-center h-full"
                            >
                                <p className="text-sm text-primary-100">{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Security;
