import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Placeholder pages
import Home from './pages/Home';
import Features from './pages/Features';
import Architecture from './pages/Architecture';
import UseCase from './pages/UseCase';
import Dashboard from './pages/Dashboard';
import Demo from './pages/Demo';
import About from './pages/About';
import Contact from './pages/Contact';
import Report from './pages/Report';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import CustomCursor from './components/ui/CustomCursor';

function App() {
  return (
    <Router>
      <CustomCursor />
      <div className="min-h-screen bg-brand-dark text-brand-white selection:bg-brand-cyan/30 selection:text-brand-cyan">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/use-case" element={<UseCase />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/report" element={<Report />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
