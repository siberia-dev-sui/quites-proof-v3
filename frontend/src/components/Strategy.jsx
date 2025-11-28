
import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, Wallet, RefreshCw, BarChart3, Lock, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import GrowthChart from './GrowthChart';

const Strategy = () => {
    return (
        <section id="strategy" className="min-h-screen flex flex-col justify-center relative overflow-hidden py-24">
            {/* Background - Deep & Clean */}
            <div className="absolute inset-0">
                <ParticleBackground />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-950/5 to-transparent opacity-90 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-primary-200 mb-6 tracking-widest uppercase"
                    >
                        <Activity size={12} className="text-white" />
                        The Quintes Engine
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6"
                    >
                        Your Assets, Amplified. <br />
                        <span className="text-white/60">A Simple Way to Grow Your Crypto.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-lg text-primary-100/70 max-w-3xl mx-auto leading-relaxed"
                    >
                        Quintes is a platform that turns your USDC, BTC, or ETH deposits into QNT, a token designed to grow at a steady rate (targeting up to 33% annually), like a reliable, high-yield savings plan. Your deposits are safely backed by extra collateral, ensuring you can trade QNT or cash it out for your original assets anytime.
                    </motion.p>
                </div>

                {/* Two Ways to Earn Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                    {/* Way 1: Hold QNT */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="glass-morphism p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <div className="mb-6 p-3 rounded-lg bg-white/10 w-fit">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">1. Hold QNT</h3>
                        <p className="text-sm text-white/60 mb-4 font-medium">Target: ~33% APY (Stable Growth)</p>
                        <ul className="space-y-4 text-primary-100/70 text-sm leading-relaxed">
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 shrink-0" />
                                <span>
                                    <strong className="text-white">Engineered Appreciation:</strong> Simply hold QNT in your wallet. It is programmed to rise in value steadily (e.g., ~0.253% every three days) against the dollar.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 shrink-0" />
                                <span>
                                    <strong className="text-white">No Lock-ups:</strong> Unlike staking, you don't need to lock your tokens. You retain full liquidity and can sell or transfer QNT at any time.
                                </span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Way 2: Stake Collateral (HFT) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="glass-morphism p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <div className="mb-6 p-3 rounded-lg bg-white/10 w-fit">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">2. Stake Collateral (HFT)</h3>
                        <p className="text-sm text-white/60 mb-4 font-medium">Target: High Yield from Trading</p>
                        <ul className="space-y-4 text-primary-100/70 text-sm leading-relaxed">
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 shrink-0" />
                                <span>
                                    <strong className="text-white">High-Frequency Trading:</strong> Deposit collateral (BTC/ETH) to participate in our institutional-grade HFT strategies.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                <span>
                                    <strong className="text-white">Real Yield:</strong> Earn rewards generated from actual market-neutral trading profits (30-45% historical performance), not inflationary token emissions.
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Growth Chart Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-semibold text-white mb-2">Proven Performance</h3>
                        <p className="text-primary-100/60 text-sm">Historical simulation of QNT growth vs Major Assets</p>
                    </div>
                    <GrowthChart />
                </motion.div>
            </div>

            {/* Footer / Trust Indicators */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-24 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
            >
                {/* Placeholder for Audit/Partner Logos - kept minimal */}
                <div className="flex items-center gap-2 text-sm font-mono text-white/60">
                    <ShieldCheck size={14} />
                    <span>AUDITED CONTRACTS</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono text-white/60">
                    <Lock size={14} />
                    <span>24/7 MONITORING</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-mono text-white/60">
                    <BarChart3 size={14} />
                    <span>ON-CHAIN TRANSPARENCY</span>
                </div>
            </motion.div>

        </section>
    );
};

export default Strategy;
