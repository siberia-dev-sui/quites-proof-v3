/**
 * SignupOptions Component - Premium Design
 * Dual signup flow: Standard Email vs Web3 Verified Member
 * Integrates iExec Web3 Mail for encrypted email delivery
 */

import React, { useState } from 'react';
import { Mail, Wallet, Check, Shield, Zap, Loader2, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useWeb3 from '../hooks/useWeb3';
import { completeWhitelistFlow } from '../services/iExecAPI';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Progress steps for Web3 signup
const PROGRESS_STEPS = [
  { id: 1, label: 'Connecting...' },
  { id: 2, label: 'Encrypting email...' },
  { id: 3, label: 'Granting access...' },
  { id: 4, label: 'Sending email...' },
  { id: 5, label: 'Complete!' }
];

const SignupOptions = () => {
  // Standard signup state
  const [email, setEmail] = useState('');
  const [standardLoading, setStandardLoading] = useState(false);
  const [standardSuccess, setStandardSuccess] = useState(false);

  // Web3 signup state
  const [web3Email, setWeb3Email] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepMessage, setStepMessage] = useState('');
  const [web3Loading, setWeb3Loading] = useState(false);
  const [web3Success, setWeb3Success] = useState(false);
  const [web3Error, setWeb3Error] = useState(null);

  // Web3 hook
  const {
    address,
    shortenedAddress,
    isConnecting,
    isConnected,
    isCorrectNetwork,
    error: walletError,
    connect,
    switchNetwork
  } = useWeb3();

  /**
   * Handle standard email signup
   */
  const handleStandardSignup = async (e) => {
    e.preventDefault();
    
    if (!email || !EMAIL_REGEX.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    setStandardLoading(true);
    
    setTimeout(() => {
      setStandardLoading(false);
      setStandardSuccess(true);
      setEmail('');
    }, 1500);
  };

  /**
   * Handle Web3 wallet connection
   */
  const handleConnectWallet = async () => {
    const connectedAddress = await connect();
    if (connectedAddress) {
      setShowEmailInput(true);
    }
  };

  /**
   * Handle Web3 signup with iExec
   */
  const handleWeb3Signup = async (e) => {
    e.preventDefault();

    if (!web3Email || !EMAIL_REGEX.test(web3Email)) {
      setWeb3Error('Please enter a valid email address');
      return;
    }

    if (!isConnected) {
      setWeb3Error('Please connect your wallet first');
      return;
    }

    if (!isCorrectNetwork) {
      const switched = await switchNetwork();
      if (!switched) {
        setWeb3Error('Please switch to Arbitrum Sepolia network');
        return;
      }
    }

    setWeb3Loading(true);
    setWeb3Error(null);
    setCurrentStep(1);

    try {
      await completeWhitelistFlow(
        web3Email,
        address,
        (step, message) => {
          setCurrentStep(step);
          setStepMessage(message);
        }
      );

      setWeb3Success(true);
      setWeb3Email('');

    } catch (error) {
      console.error('Web3 signup error:', error);
      setWeb3Error(error.message || 'An error occurred. Please try again.');
      setCurrentStep(0);
    } finally {
      setWeb3Loading(false);
    }
  };

  /**
   * Reset Web3 flow
   */
  const resetWeb3Flow = () => {
    setShowEmailInput(false);
    setCurrentStep(0);
    setStepMessage('');
    setWeb3Error(null);
    setWeb3Success(false);
  };

  return (
    <section id="signup" className="py-16">
      <div className="w-full max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Choose How You Join
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg"
          >
            Select the best way to stay updated with Quintes Protocol.
          </motion.p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 relative items-stretch">
          
          {/* Divider for Desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-black border border-white/20 rounded-full px-4 py-2 text-xs font-mono text-white/40 uppercase tracking-widest">
              OR
            </div>
          </div>

          {/* ============================================ */}
          {/* Option A: Standard Signup - Minimal Style */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="standard-card p-8 rounded-2xl flex flex-col h-full"
          >
            <div className="mb-6">
              <div className="text-[10px] font-mono text-white/30 mb-3 tracking-widest">
                [ OPTION A: STANDARD SIGNUP ]
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Email Whitelist</h4>
              <p className="text-white/50 text-sm">Enter your email to join our whitelist.</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Check size={12} className="text-white/70" />
                </div>
                <span>Fast & <span className="text-white font-medium">Free</span></span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Check size={12} className="text-white/70" />
                </div>
                <span>Get general updates</span>
              </li>
            </ul>

            <AnimatePresence mode="wait">
              {standardSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-3 py-6"
                >
                  <CheckCircle2 size={48} className="text-green-400" />
                  <p className="text-green-400 font-medium">You're on the list!</p>
                  <p className="text-white/40 text-sm">We'll keep you updated.</p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleStandardSignup}
                  className="space-y-4"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all text-sm"
                    disabled={standardLoading}
                  />
                  <button
                    type="submit"
                    disabled={standardLoading}
                    className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 disabled:opacity-50"
                  >
                    {standardLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Mail size={18} />
                    )}
                    {standardLoading ? 'Signing up...' : 'Sign Up'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ============================================ */}
          {/* Option B: Web3 Signup - PREMIUM Design */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="premium-card-wrapper"
          >
            <div className="premium-card-inner shine-effect p-8 rounded-2xl flex flex-col h-full relative overflow-hidden">
              
              {/* Glowing Orbs */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="badge-recommended flex items-center gap-1">
                  <Sparkles size={10} />
                  RECOMMENDED
                </span>
              </div>

              <div className="mb-6 relative z-10">
                <div className="text-[10px] font-mono text-cyan-300/60 mb-3 tracking-widest">
                  [ OPTION B: WEB3 SIGNUP ]
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Verified Member</h4>
                <p className="text-white/50 text-sm">Join as a Verified Member with your wallet.</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                <li className="flex items-center gap-3 text-sm text-white/70">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-500/10 flex items-center justify-center">
                    <Shield size={14} className="text-cyan-400" />
                  </div>
                  <span>Maximum Privacy & <span className="text-white font-semibold">Security</span></span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/70">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-500/10 flex items-center justify-center">
                    <Zap size={14} className="text-purple-400" />
                  </div>
                  <span>Access to Exclusive <span className="text-white font-semibold">'Alpha'</span></span>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/70">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500/30 to-pink-500/10 flex items-center justify-center">
                    <Wallet size={14} className="text-pink-400" />
                  </div>
                  <span><span className="text-white font-semibold">On-Chain</span> Proof of Support</span>
                </li>
              </ul>

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {/* Success State */}
                  {web3Success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-3 py-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
                        <CheckCircle2 size={40} className="text-green-400" />
                      </div>
                      <p className="text-green-400 font-semibold text-lg">You're a Verified Member!</p>
                      <p className="text-white/40 text-sm text-center">Check your email for confirmation via Web3 Mail.</p>
                    </motion.div>
                  ) : web3Loading ? (
                    /* Loading State with Progress */
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      {/* Progress Steps */}
                      <div className="flex justify-between mb-3">
                        {PROGRESS_STEPS.map((step) => (
                          <div
                            key={step.id}
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                              currentStep > step.id
                                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                                : currentStep === step.id
                                ? 'bg-gradient-to-br from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30 animate-pulse'
                                : 'bg-white/10 text-white/30'
                            }`}
                          >
                            {currentStep > step.id ? '✓' : step.id}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-3 py-4">
                        <Loader2 size={22} className="animate-spin text-cyan-400" />
                        <span className="text-white/60 text-sm">{stepMessage}</span>
                      </div>
                    </motion.div>
                  ) : !isConnected ? (
                    /* Not Connected - Show Connect Button */
                    <motion.div key="connect" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <button
                        onClick={handleConnectWallet}
                        disabled={isConnecting}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white font-semibold transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {isConnecting ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <Wallet size={20} />
                        )}
                        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                      </button>
                      <p className="text-center text-[10px] text-white/30 mt-4 font-mono tracking-wide">
                        Powered by iExec Web3 Mail
                      </p>
                    </motion.div>
                  ) : !showEmailInput ? (
                    /* Connected - Show Continue Button */
                    <motion.div
                      key="connected"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={18} className="text-green-400" />
                          <span className="text-green-400 text-sm font-medium">Connected</span>
                        </div>
                        <span className="text-white/50 text-xs font-mono">{shortenedAddress}</span>
                      </div>
                      <button
                        onClick={() => setShowEmailInput(true)}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Continue to Signup
                      </button>
                    </motion.div>
                  ) : (
                    /* Email Input Form */
                    <motion.form
                      key="email-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleWeb3Signup}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-white/50 text-xs font-mono">{shortenedAddress}</span>
                        <button
                          type="button"
                          onClick={resetWeb3Flow}
                          className="text-white/30 hover:text-white/60 p-1 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      {/* Error Message */}
                      {web3Error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                        >
                          <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                          <span className="text-red-400 text-xs">{web3Error}</span>
                        </motion.div>
                      )}

                      <input
                        type="email"
                        value={web3Email}
                        onChange={(e) => setWeb3Email(e.target.value)}
                        placeholder="Enter your email for Web3 Mail"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all text-sm"
                      />
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white font-semibold transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Mail size={18} />
                        Join via Web3 Mail
                      </button>
                      <p className="text-center text-[10px] text-white/25">
                        Your email will be encrypted using iExec technology
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SignupOptions;
