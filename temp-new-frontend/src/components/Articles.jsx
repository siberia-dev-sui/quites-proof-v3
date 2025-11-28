import React from 'react';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Articles = () => {
    const articles = [
        {
            title: "Understanding Automated Proof of Collateral",
            excerpt: "A deep dive into how APoC ensures QNT remains over-collateralized and liquid in all market conditions.",
            date: "Nov 15, 2024",
            readTime: "5 min read",
            category: "Technology"
        },
        {
            title: "The Future of Yield: Why Stability Matters",
            excerpt: "Exploring the shift from speculative DeFi tokens to sustainable, real-yield generating assets.",
            date: "Nov 10, 2024",
            readTime: "4 min read",
            category: "Market Analysis"
        },
        {
            title: "Quintes Protocol Roadmap: Phase 2 Unveiled",
            excerpt: "What to expect in the upcoming testnet launch and how to participate in the early access program.",
            date: "Nov 05, 2024",
            readTime: "3 min read",
            category: "Announcements"
        }
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-fit text-xs rounded-full px-2.5 py-1 glass-morphism text-primary-200 flex items-center gap-x-2"
                        >
                            <BookOpen size={12} />
                            Latest Insights
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-3xl md:text-4xl font-bold text-white"
                        >
                            Research & Updates
                        </motion.h2>
                    </div>

                    <motion.a
                        href="https://quintes.gitbook.io/quintes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors group"
                    >
                        View all articles
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                            className="glass-morphism p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 group cursor-pointer flex flex-col h-full"
                        >
                            <div className="mb-4 flex items-center justify-between text-xs text-primary-100/50">
                                <span className="px-2 py-1 rounded-full bg-white/5 border border-white/5 text-primary-200">
                                    {article.category}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    {article.date}
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {article.title}
                            </h3>

                            <p className="text-primary-100/60 text-sm leading-relaxed mb-6 flex-1">
                                {article.excerpt}
                            </p>

                            <div className="flex items-center text-xs text-primary-100/40 font-mono mt-auto">
                                {article.readTime}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Articles;
