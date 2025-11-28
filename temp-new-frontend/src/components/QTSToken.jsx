import React from 'react';
import { Coins } from 'lucide-react';
import { motion } from 'framer-motion';

const QTSToken = () => {
    return (
        <section className="py-24 md:py-48">
            <div className="container mx-auto px-4 space-y-8 flex flex-col items-center">
                <div className="space-y-6 flex flex-col items-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-fit text-xs rounded-full px-2.5 py-1 glass-morphism text-primary-200 flex items-center gap-x-2"
                    >
                        <Coins size={12} />
                        The Ecosystem Token
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-semibold text-primary-50 text-3xl xl:text-5xl leading-120% tracking-tighter text-center"
                    >
                        QTS: Utility, Governance, and Value Accrual
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="space-y-4 text-center w-full"
                    >
                        <p className="leading-150% tracking-normal text-primary-100 text-base xl:text-lg">
                            Our native token, QTS (100 Billion fixed supply), is central to the ecosystem.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                                className="glass-morphism p-6 rounded-xl space-y-2"
                            >
                                <h3 className="text-lg font-semibold text-primary-50">Utility for Participants</h3>
                                <p className="text-sm text-primary-100">Used for staking to enhance yields on QNT minting, participating in governance, and as a component of QNT collateral.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                                className="glass-morphism p-6 rounded-xl space-y-2"
                            >
                                <h3 className="text-lg font-semibold text-primary-50">Value Accrual</h3>
                                <p className="text-sm text-primary-100">QTS is designed to capture value from overall protocol success, with its utility-driven market cap targeted to be linked to the protocol's TVL, and by benefiting from protocol revenue sharing.</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default QTSToken;
