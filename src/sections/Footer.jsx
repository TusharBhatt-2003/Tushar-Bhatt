import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useColor } from "../context/ColorContext";
import { colors } from "../data/colorData"; // Import colors array

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { color, textColor, changeColor } = useColor(); // Destructure changeColor from context
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const sectionRef = useRef(null); // Reference to the section container
  const textRefs = useRef([]); // References for the individual text elements

  const handleColorChange = () => {
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(nextColorIndex);
    const { bgColor, textColor } = colors[nextColorIndex];
    changeColor(bgColor, textColor);
  };

  useEffect(() => {
    const elements = textRefs.current.filter((el) => el); // Ensure valid elements
    if (sectionRef.current) {
      gsap.fromTo(
        elements,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.5,
          duration: 1,
          ease: "bounce",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // Start animation when section is in view
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-fit md:h-screen w-screen flex flex-col text-center justify-center font-['Aero']"
      style={{ backgroundColor: textColor, color: color }}
    >
      <h1
        className="font-['Bagel_Fat_One'] mt-5 w-fit self-center text-7xl mb-24 select-none drop-shadow cursor-pointer"
        onClick={handleColorChange}
      >
        Tushar
        <p
          className="text-lg font-['Aero'] mt-2"
        >
          Frontend Developer
        </p>
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-fit">
        {/* Navigation Links */}
        <div
          className="nav w-full h-full md:border-r-2"
          style={{ borderColor: color }}
        >
          <div
            className="flex flex-col text-start mx-16 mt-5 lg:my-10 pb-5 lg:border-none border-b-2"
            style={{ borderColor: color }}
            ref={(el) => (textRefs.current[1] = el)}
          >
            <a href="#landingPage">Home</a>
            <a href="#aboutme">About Me</a>
            <a href="#resume">Resume</a>
            <a href="#projects">Projects</a>
            <a href="#contactme">Contact Me</a>
          </div>
        </div>

        {/* Address Section */}
        <div
          className="w-full h-full lg:border-r-2"
          style={{ borderColor: color }}
         
        >
          <div className="address text-start mx-16 mt-5 lg:my-10 pb-5 lg:border-none border-b-2"
             style={{ borderColor: color }}
             ref={(el) => (textRefs.current[2] = el)}>
            <p>
              Faridabad, Haryana <br /> Delhi NCR <br /> INDIA
            </p>
            <br />
            <p>Not giving you the whole address</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div
          className="w-full h-full md:border-r-2"
          style={{ borderColor: color }}
         
        >
          <div className="social-media text-start mx-16 mt-5 lg:my-10 pb-5 md:border-none border-b-2"
             style={{ borderColor: color }}
             ref={(el) => (textRefs.current[3] = el)}
             >
            <p>Follow Me On</p>
            <br />
            <ul 
              className="flex flex-col underlineCssResume"
              style={{ "--after-bg-color": color }}
            >
              <li>
                <a
                  href="https://github.com/TusharBhatt-2003"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/tushar-bhatt-05b8b11a5/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_tush_ar._._/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Tech Used Section */}
        <div className="w-full h-full">
          <div className="contact text-start mx-16 mt-5 lg:my-10 pb-5 md:border-none border-b-2"
           
             style={{ borderColor: color }}>
            <div 
             ref={(el) => (textRefs.current[4] = el)}>
            <p>Tech Used in This Website</p>
            <ul 
              className="flex flex-col underlineCssResume mt-5"
              style={{ "--after-bg-color": color }}
            >
              <li>
                <a
                  href="https://vite.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React (Vite)
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
              </li>
              <li>
                <a
                  href="https://locomotivemtl.github.io/locomotive-scroll/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Locomotive
                </a>
              </li>
              <li>
                <a
                  href="https://gsap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GSAP
                </a>
              </li>
              <li>
                <a
                  href="https://www.framer.com/motion/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Framer Motion
                </a>
              </li>
            </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="h-40 flex flex-col justify-end mb-5">
        <p>
          Designed and Created by Tushar Bhatt
        </p>
      </div>
    </div>
  );
};

export default Footer;
