import { useEffect, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import NavBar from './Components/NavBar.jsx';
import LandingPage from './Components/LandingPage';
import About from './Components/About';
import Resume from './Components/Resume';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Loader from './Components/Loader'; // Import the Loader component
import './App.css';
import { useColor } from './context/ColorContext';

const App = () => {
  const { color, textColor } = useColor();

  // State to manage the loading state of the app
  const [loading, setLoading] = useState(true);
  const [locomotiveScroll, setLocomotiveScroll] = useState(null); // Add state to manage LocomotiveScroll instance

  useEffect(() => {
    // Set a loading timeout to simulate loading process
    const loadingTimeout = setTimeout(() => {
      setLoading(false); // Once done, set loading to false to hide the Loader
    }, 3000); // Adjust the time as necessary

    // Initialize LocomotiveScroll only after loading is complete
    if (!loading) {
      const scrollInstance = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      });
      setLocomotiveScroll(scrollInstance);
    }

    // Cleanup function to destroy LocomotiveScroll on unmount
    return () => {
      clearTimeout(loadingTimeout); // Clear the timeout
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, [loading]); // Dependency array includes loading state

  // Convert hex or CSS color names to rgba with desired opacity
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
        <Loader /> // Show the Loader component when loading is true
      ) : (
        <div
          className="w-full h-full"
          data-scroll-container
          style={{ backgroundColor: color, color: textColor }}
        >
          {/* Dynamic style element for ::selection with opacity control */}
          <style>
            {`
              ::selection {
                background: ${rgbaColor(textColor, 0.7)}; /* Use rgba to control opacity */
                color: ${color};
              }
            `}
          </style>

          {/* Main Content */}
          <NavBar />
          <LandingPage />
          <About />
          <Resume />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
