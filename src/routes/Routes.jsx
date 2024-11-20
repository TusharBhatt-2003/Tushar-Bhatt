import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../sections/LandingPage';
import About from '../sections/About';
import Resume from '../sections/Resume';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import Theme from '../pages/Theme'; // Import the Theme page
import Footer from '../sections/Footer';
import CatGame from '../easterEggs/CatGame';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/cat-game" element={<CatGame />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
