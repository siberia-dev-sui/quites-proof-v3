import React from 'react';
import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Mission = () => {
    return (
        <section className="py-20 relative overflow-hidden min-h-screen flex items-center">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4 block"
                    >
                        Our Mission
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
                    >
                        Redefining Value Accrual for the Digital Age.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="space-y-6 text-lg text-primary-100/70 leading-relaxed"
                    >
                        <p>
                            Quintes addresses a significant market demand for reliable, efficient, and sustainable yield solutions in a financial world often characterized by volatility and uncertainty. Our commitment is to create a robust autonomous protocol that delivers consistent returns and capital preservation within a dynamic global market. We derive our name from "quintessence," reflecting our mission: to deliver the purest, most concentrated form of capital efficiency and engineered financial stability.
                        </p>
                        <p>
                            We are building more than a protocol; we are architecting a new standard for trustworthy, yield-bearing digital assets. Our core value proposition is to provide a secure and transparent platform where holders of BTC, ETH, and stablecoins can stake their assets to generate competitive, sustainable, non-dilutive yield, while gaining exposure to an asset, QNT, engineered for stable growth in any market condition.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
