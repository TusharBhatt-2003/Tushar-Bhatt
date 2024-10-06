import { useColor } from "../context/ColorContext";
import { colors } from '../data/colorData'; // Import colors array

const Footer = () => {
  const { color, textColor, changeColor } = useColor(); // Destructure changeColor from context

  const handleColorChange = () => {
    const currentColorIndex = colors.findIndex(c => c.bgColor === color);
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    const { bgColor, textColor } = colors[nextColorIndex];
    changeColor(bgColor, textColor);
  };

  return (
    <div
      className='relative h-fit lg:h-screen w-screen flex flex-col text-center justify-center font-["Aero"]'
      style={{ backgroundColor: color, color: textColor }}
    >
      <h1
        className='font-["Bagel_Fat_One"] w-fit self-center text-7xl mb-24 cursor-pointer' // Add cursor-pointer class
        onClick={handleColorChange} // Add onClick event for color change
      >
        Tushar
      </h1>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-fit'>
         <div className="nav w-full h-full md:border-r"
              style={{ borderColor: textColor,}}>
           <div className="flex flex-col text-start mx-16 my-10">
            <a href="#landingPage">Home</a>
            <a href="#aboutme">About me.</a>
            <a href="#resume">Resume</a>
            <a href="#projects">Projects</a>
            <a href="#contactme">Contact me.</a>
           </div>
         </div>
        <div className='w-full h-full md:border-r'
             style={{ borderColor: textColor,}}>
          <div className='address text-start mx-16 my-10'>
            <p>Faridabad, Haryana <br /> Delhi NCR</p>
            <br />
            <p>Not giving you the whole address</p>
          </div>
        </div>
        <div className='w-full h-full md:border-r'
             style={{ borderColor: textColor,}}>
          <div className='social-media text-start mx-16 my-10'>
            <p>Follow me on</p>
            <br />
            <div className='flex flex-col'>
              <a className="hover:underline" href='https://github.com/TusharBhatt-2003' target='_blank' rel="noopener noreferrer">Git Hub</a>
              <a className="hover:underline" href='https://www.linkedin.com/in/tushar-bhatt-05b8b11a5/' target='_blank' rel="noopener noreferrer">Linkedin</a>
              <a className="hover:underline" href='https://www.instagram.com/_tush_ar._._/' target='_blank' rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
        <div className='w-full h-full'>
          <div className='contact text-start mx-16 my-10'>
            <p>Tech used in this Website</p>
            <div className='flex flex-col'>
              <br />
              <ul>
                <li>
                  <a 
                  className="hover:underline" 
                  href='https://vite.dev/' 
                  target='_blank' 
                  rel="noopener noreferrer">
                  React (VITE)
                  </a>
                </li>
                <li>
                  <a 
                   className="hover:underline" 
                   href='https://tailwindcss.com/' 
                   target='_blank' 
                   rel="noopener noreferrer">
                   Tailwind CSS
                  </a>
                </li>
                <li>
                  <a 
                   className="hover:underline" 
                   href='https://locomotivemtl.github.io/locomotive-scroll/' 
                   target='_blank' 
                   rel="noopener noreferrer">
                   Locomotive
                  </a>
                </li>
                <li>
                  <a 
                   className="hover:underline" 
                   href='https://gsap.com/' 
                   target='_blank' 
                   rel="noopener noreferrer">
                   Gsap
                  </a>
                </li>
                <li>
                  <a 
                   className="hover:underline" 
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
