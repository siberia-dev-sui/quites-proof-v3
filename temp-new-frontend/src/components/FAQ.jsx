import React, { useState } from 'react';
import { MessageCircleQuestion, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-[#3e3e3e]">
            <h3>
                <button
                    type="button"
                    onClick={onClick}
                    className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline w-full"
                >
                    <h6 className="font-medium text-primary-50 text-base xl:text-lg 2xl:text-xl leading-120% tracking-tight text-left">
                        {question}
                    </h6>
                    <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            </h3>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }} // Slightly smoother expansion
                        className="overflow-hidden text-sm"
                    >
                        <div className="pb-4 pt-0 text-white/50">
                            <p>{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How do I earn with Quintes using my BTC, ETH, or Stablecoins?",
            answer: "You securely deposit your assets to mint QNT, our innovative yield-bearing stable asset. Your deposited collateral is then partially deployed into sophisticated, Shariah-compliant trading strategies that generate real revenue. You benefit from QNT's engineered value growth and can earn additional QTS rewards for participating."
        },
        {
            question: "What is QNT?",
            answer: "QNT is a yield-bearing, stable asset you mint against your deposited collateral. It's overcollateralized and engineered for consistent value growth through unique, patented cryptoeconomic mechanisms, supported by yields from deployed collateral. The goal is to provide a reliable way for your crypto holdings to grow steadily."
        },
        {
            question: "How does QNT achieve its consistent growth?",
            answer: "QNT is a synthetic token tied to a target price that is programmed to rise steadily, aiming for significant annual growth. This is supported by profits from deploying user collateral into proven, market-neutral hedging strategies that increase the collateral's value. Automated \"PegKeepers\" and arbitrage ensure the market price stays aligned with this appreciating target."
        },
        {
            question: "Is my deposited collateral always safe?",
            answer: "Security is paramount. For every $1 of QNT, we maintain at least $2 of collateral. If collateral values drop, automated partial liquidation restores this ratio. Additionally, reserve funds and our QTS treasury act as backstops. This Automated Proof of Collateral (APoC) system is designed to ensure QNT is always fully backed and redeemable."
        },
        {
            question: "How is Quintes Shariah-compliant?",
            answer: "Our trading strategies, investment policies, and mechanisms are reviewed by Shariah scholars to ensure they align with Islamic financial principles, avoiding interest (Riba) and excessive uncertainty (Gharar)."
        },
        {
            question: "How is Quintes different from past yield protocols like Luna/UST?",
            answer: "The difference is fundamental. Quintes is built on full 200% over-collateralization with diverse assets like BTC, ETH, and stablecoins. Luna/UST was an undercollateralized, algorithmic model reliant on its sister token's price. Our system is designed for long-term stability and solvency, a lesson learned from the failures of past protocols."
        }
    ];

    return (
        <section id="faq" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 space-y-8 flex flex-col items-center">
                <div className="space-y-6 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-fit text-xs rounded-full px-2.5 py-1 glass-morphism text-primary-200 flex items-center gap-x-2"
                    >
                        <MessageCircleQuestion size={12} />
                        Questions?
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-semibold text-primary-50 text-3xl xl:text-5xl leading-120% tracking-tighter max-w-2xl text-center"
                    >
                        Your Quintes Queries, Answered
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="w-full lg:w-[800px]"
                >
                    <div className="px-0 md:px-8 w-full border-t border-[#3e3e3e]">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
