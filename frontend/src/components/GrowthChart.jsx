import React from 'react';
import { motion } from 'framer-motion';

const GrowthChart = () => {
    return (
        <div className="w-full max-w-4xl mx-auto mt-16 p-6 md:p-8 rounded-3xl glass-morphism border border-white/5 bg-black/40 backdrop-blur-xl relative overflow-hidden group">
            {/* Header / Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-6 text-xs md:text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <span className="text-white">QNT (Target)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500/50"></div>
                        <span className="text-white/50">ETH</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500/50"></div>
                        <span className="text-white/50">BTC</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                        <span className="text-white/50">S&P 500</span>
                    </div>
                </div>
                <div className="text-xs text-white/30 font-mono">
                    Normalized Historical Performance
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-[300px] w-full">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-xs text-white/10 font-mono pointer-events-none">
                    <div className="border-b border-white/5 w-full h-0"></div>
                    <div className="border-b border-white/5 w-full h-0"></div>
                    <div className="border-b border-white/5 w-full h-0"></div>
                    <div className="border-b border-white/5 w-full h-0"></div>
                    <div className="border-b border-white/5 w-full h-0"></div>
                </div>

                <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="qntGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* BTC (Volatile) */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M0,250 C50,240 100,280 150,220 C200,180 250,260 300,200 C350,150 400,220 450,180 C500,140 550,190 600,120 C650,80 700,150 750,100 L800,130"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        strokeLinecap="round"
                    />

                    {/* ETH (Volatile) */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
                        d="M0,260 C60,270 120,230 180,250 C240,210 300,240 360,190 C420,160 480,200 540,150 C600,120 660,160 720,110 L800,90"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        strokeLinecap="round"
                    />

                    {/* S&P 500 (Steady but slow) */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
                        d="M0,280 L800,180"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeOpacity="0.3"
                        strokeDasharray="5,5"
                    />

                    {/* QNT (Smooth Exponential Growth) */}
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
                        d="M0,280 Q400,270 800,50"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="drop-shadow(0 0 8px rgba(59,130,246,0.5))"
                    />

                    {/* QNT Area Fill */}
                    <motion.path
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 2 }}
                        d="M0,280 Q400,270 800,50 L800,300 L0,300 Z"
                        fill="url(#qntGradient)"
                    />
                </svg>

                {/* Floating Tooltip / Highlight at the end */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 3 }}
                    className="absolute top-[16%] right-0 transform translate-x-1/2 -translate-y-1/2"
                >
                    <div className="relative">
                        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,1)] animate-pulse"></div>
                        <div className="absolute top-6 right-0 bg-blue-950/80 backdrop-blur-md border border-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-200 whitespace-nowrap">
                            +33% APY Target
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GrowthChart;
