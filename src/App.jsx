import LocomotiveScroll from 'locomotive-scroll'; // Import LocomotiveScroll styles if needed
import LandingPage from './Components/LandingPage';
import About from './Components/About';
import Resume from './Components/Resume';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import "./App.css"
import { useColor } from "./context/ColorContext";

const App = () => {

  const { color, textColor } = useColor();
  const locomotiveScroll = new LocomotiveScroll();

  return (
    <div className='w-screen h-screen'
     style={{ backgroundColor: color, color: textColor }}>
      <LandingPage /> 
      <About />
      <Resume />
      <Projects />   
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
