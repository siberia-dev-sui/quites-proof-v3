import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Mission from './components/Mission';
import Strategy from './components/Strategy';
import QTSToken from './components/QTSToken';
import Security from './components/Security';
import Contributors from './components/Contributors';
import Roadmap from './components/Roadmap';
import Articles from './components/Articles';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <main className="relative font-sans gradient-background overflow-hidden">
                <Navbar />
                <Hero />
                <About />
                <Strategy />
                <QTSToken />
                <Security />
                <Contributors />
                <Roadmap />
                <FAQ />
                <Articles />
                <Footer /> {/* SignupOptions included inside Footer */}
            </main>
        </div>
    );
}

export default App;
