import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Contributors = () => {
    const partners = [
        { name: "Morgan Stanley", logo: "https://pub-731cbf0e109a4a5fbffae6de248ddd3a.r2.dev/Morgan_Stanley_Logo%201.svg" },
        { name: "UCL", logo: "https://pub-731cbf0e109a4a5fbffae6de248ddd3a.r2.dev/UCL%201.svg" },
        { name: "Algorand", logo: "https://pub-731cbf0e109a4a5fbffae6de248ddd3a.r2.dev/algorand%201.svg" },
        { name: "Binance", logo: "https://pub-731cbf0e109a4a5fbffae6de248ddd3a.r2.dev/binance%201.svg" },
        { name: "Chainlink", logo: "https://pub-731cbf0e109a4a5fbffae6de248ddd3a.r2.dev/chainlink_logo%201.svg" },
        { name: "Consensys", logo: "https://pub-731cbf0e109a4a5fbffae6de248ddd3a.r2.dev/consensys%201.svg" },
        { name: "King's College London", logo: "https://pub-731cbf0e109a4a5fbffae6de248ddd3a.r2.dev/kings-college-london%201.svg" },
        { name: "MetaMask", logo: "https://pub-731cbf0e109a4a5fbffae6de248ddd3a.r2.dev/metamask_logo%201.svg" }
    ];

    return (
        <section id="contributors" className="py-24 relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="container mx-auto px-4 gap-8 md:gap-16 grid lg:grid-cols-2 items-center">
                <div className="space-y-6 w-full max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-fit text-xs rounded-full px-2.5 py-1 glass-morphism text-primary-200 flex items-center gap-x-2"
                    >
                        <Users size={12} />
                        Contributors
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-semibold text-primary-50 text-3xl xl:text-5xl leading-120% tracking-tighter"
                    >
                        Driven by Deep Expertise in Finance & Technology
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="leading-relaxed text-primary-100/90 text-base xl:text-lg"
                    >
                        The Quintes Protocol is the product of over two years of intensive research and development by a global team of dedicated contributors, including renowned token engineers, data scientists, cryptoeconomic researchers, and financial veterans from leading institutions like Binance, Morgan Stanley, and Chainlink.
                    </motion.p>
                </div>

                <div className="w-full space-y-12">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="leading-150% tracking-normal text-sm text-white/40 font-medium"
                    >
                        Contributors coming from:
                    </motion.p>

                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                        {partners.map((partner, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 + (index * 0.05), ease: "easeOut" }}
                                className="flex items-center justify-center group"
                            >
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-w-full max-h-12 md:max-h-20 w-auto opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contributors;
