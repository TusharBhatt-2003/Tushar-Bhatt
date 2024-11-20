import { useEffect, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar.jsx';
import LandingPage from './sections/LandingPage';
import About from './sections/About';
import Resume from './sections/Resume';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Loader from './Components/Loader';
import Theme from './Page/Theme'; // Import Theme page
import './App.css';
import { useColor } from './context/ColorContext';
import CatGame from './easterEggs/Game/CatGame.jsx';

const App = () => {
  const { color, textColor } = useColor();
  const [loading, setLoading] = useState(true);
  const [locomotiveScroll, setLocomotiveScroll] = useState(null);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setLoading(false), 3000);

    if (!loading) {
      const scrollInstance = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      });
      setLocomotiveScroll(scrollInstance);
    }

    return () => {
      clearTimeout(loadingTimeout);
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, [loading]);

  const rgbaColor = (color, opacity = 0.7) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const rgb = window.getComputedStyle(tempDiv).color.match(/\d+/g);
    document.body.removeChild(tempDiv);
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <div
            className="w-full h-full"
          
            style={{ backgroundColor: color, color: textColor }}
          >
            <style>
              {`
                ::selection {
                  background: ${rgbaColor(textColor, 0.7)};
                  color: ${color};
                }
              `}
            </style>

            <NavBar />

            <Routes>
              {/* Main Content */}
              <Route
                path="/"
                element={
                  <>
                    <LandingPage />
                    <About />
                    <Resume />
                    <Projects />
                    <Contact />
                    <Footer />
                  </>
                }
              />
              {/* Theme Page */}
              <Route path="/theme" element={<Theme />} />
              <Route path="/cat-game" element={<CatGame />} /> {/* The Cat Game page */}
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
};

export default App;
