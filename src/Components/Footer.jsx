import { useState } from "react";
import { useColor } from "../context/ColorContext";
import { colors } from '../data/colorData'; // Import colors array

const Footer = () => {
  const { color, textColor, changeColor } = useColor(); // Destructure changeColor from context
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  
  const handleColorChange = () => {
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(nextColorIndex);
    const { bgColor, textColor } = colors[nextColorIndex];
    changeColor(bgColor, textColor);
  };

  return (
    <div
      className='relative h-fit md:h-screen w-screen flex flex-col text-center justify-center font-["Aero"]'
      style={{ backgroundColor: color, color: textColor }}
    >
      <h1
        className='font-["Bagel_Fat_One"] w-fit self-center text-7xl mb-24 select-none drop-shadow cursor-pointer' // Add cursor-pointer class
        onClick={handleColorChange} // Add onClick event for color change
      >
        Tushar
      </h1>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-fit'>
         <div className="nav w-full h-full md:border-r-2"
              style={{ borderColor: textColor,}}>
           <div className="flex flex-col text-start mx-16 my-10">
            <a href="#landingPage">Home</a>
            <a href="#aboutme">About me.</a>
            <a href="#resume">Resume</a>
            <a href="#projects">Projects</a>
            <a href="#contactme">Contact me.</a>
           </div>
         </div>
        <div className='w-full h-full lg:border-r-2'
             style={{ borderColor: textColor,}}>
          <div className='address text-start mx-16 my-10'>
            <p>Faridabad, Haryana <br /> Delhi NCR <br /> INDIA</p>
            <br />
            <p>Not giving you the whole address</p>
          </div>
        </div>
        <div className='w-full h-full md:border-r-2'
             style={{ borderColor: textColor,}}>
          <div className='social-media text-start mx-16 my-10'>
            <p>Follow me on</p>
            <br />
            <div className='flex flex-col underlineCssResume'
              style={{'--after-bg-color': textColor}}
            >
             <ul>
             <li><a className="" href='https://github.com/TusharBhatt-2003' target='_blank' rel="noopener noreferrer">Git Hub</a></li>
             <li> <a className="" href='https://www.linkedin.com/in/tushar-bhatt-05b8b11a5/' target='_blank' rel="noopener noreferrer">Linkedin</a></li>
             <li> <a className="" href='https://www.instagram.com/_tush_ar._._/' target='_blank' rel="noopener noreferrer">Instagram</a></li>
             </ul>
            </div>
          </div>
        </div>
        <div className='w-full h-full'>
          <div className='contact text-start mx-16 my-10'>
            <p>Tech used in this Website</p>
            <div className='flex flex-col'>
              <br />
              <ul className="underlineCssResume"
               style={{'--after-bg-color': textColor,}}
              >
                <li>
                  <a 
                  className="" 
                  href='https://vite.dev/' 
                  target='_blank' 
                  rel="noopener noreferrer">
                  React (VITE)
                  </a>
                </li>
                <li>
                  <a 
                   className="" 
                   href='https://tailwindcss.com/' 
                   target='_blank' 
                   rel="noopener noreferrer">
                   Tailwind CSS
                  </a>
                </li>
                <li>
                  <a 
                   className="" 
                   href='https://locomotivemtl.github.io/locomotive-scroll/' 
                   target='_blank' 
                   rel="noopener noreferrer">
                   Locomotive
                  </a>
                </li>
                <li>
                  <a 
                   className="" 
                   href='https://gsap.com/' 
                   target='_blank' 
                   rel="noopener noreferrer">
                   Gsap
                  </a>
                </li>
                <li>
                  <a 
                   className="" 
                   href='https://www.framer.com/motion/' 
                   target='_blank' 
                   rel="noopener noreferrer">
                   Framer Motion
                  </a>
               </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="h-40 flex flex-col justify-end">
        <p>Designed and Created by Tushar Bhatt</p>
      </div>
    </div>
  );
}

export default Footer;
