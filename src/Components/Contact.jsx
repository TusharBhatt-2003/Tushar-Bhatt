import GithubIcon from "../assets/logos/github-logo-fill";
import Insta from '../assets/logos/insta'
import E_mail_logo from '../assets/logos/e-mail-logo'
import Linkedin from '../assets/logos/linkedin'
import { useColor } from "../context/ColorContext";
import { motion } from "framer-motion";
import { useEffect, useRef  } from "react";
import gsap from 'gsap';

function Contact() {

  const { color, textColor } = useColor();
  const letterRefs = useRef([]); // Reference for each letter
  const instaRefs = useRef([]); // Reference for each letter
  const sectionRef = useRef(null); // Reference for the entire contact section

  // Animation for letters when the Contact section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate the "Find me." text when the section is visible
          gsap.fromTo(
            letterRefs.current,
            { opacity: 0, y: 50 }, // Initial state: letters start lower with 0 opacity
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              stagger: 0.1, // Animate letters one by one
              ease: "elastic.out(1, 0.3)" 
            }
          ) &&  gsap.fromTo(
            instaRefs.current,
            { opacity: 0, y: 1000 }, // Initial state: letters start lower with 0 opacity
            {
              opacity: 1,
              y: 0,
              duration: 2,
              stagger: 0.1, // Animate letters one by one
              ease: "elastic.out(1.5, .7)" 
            }
          );
        }
      },
      { threshold: 0.5 } // Trigger animation when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div 
     id="contactme"
     ref={sectionRef} // Attach the section reference for the IntersectionObserver
     className='h-screen w-screen flex lg:flex-row flex-col  justify-center items-center font-["Aero"]'
         style={{ backgroundColor: color, color: textColor }}>
       <div className="border-4 m-5 rounded px-4 lg:px-10 lg:py-5 w-fit h-fit"
             style={{ borderColor: textColor, }}>
          <h1 className="my-5 text-4xl lg:text-6xl font-bold font-['Integral']">
            {/* Animate each letter in "Find me." */}
            {"Find me.".split("").map((letter, index) => (
            <motion.span
              ref={(el) => (letterRefs.current[index] = el)} // Assign each letter ref
              key={index}
              className="cursor-pointer font-bold"
              style={{
                display: "inline-block", // Ensure inline display
                marginRight: letter === " " ? "1rem" : "0", // Add space between "About" and "Me"
              }}
            >
              {letter}
            </motion.span>
          ))}
          </h1>
          <div className="social-media grid grid-cols-2">
             <motion.a   
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    href="mailto:tusharbhatt968@gmail.com" className="email">
             <E_mail_logo color={textColor} size="180"/>       
             </motion.a>
             <motion.a  
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    href="https://www.instagram.com/_tush_ar._._/" className="insta">
              <Insta color={textColor} size="180"/>
             </motion.a>
             <motion.a   
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    href="https://www.linkedin.com/in/tushar-bhatt-05b8b11a5/" className="linkedin">
               <Linkedin color={textColor} size="180"/>
             </motion.a>
             <motion.a   
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    href="https://github.com/TusharBhatt-2003" className="GitHub">
             <GithubIcon color={textColor} size="180" />
             </motion.a>
                       </div>
        </div>
        <div className="py-5 border-4 m-5 rounded px-8 lg:px-10 lg:py-5 w-fit lg:h-fit"
             style={{ borderColor: textColor, }}>
          <h1 className="text-4xl">
            Collab?
          </h1>
          <p className="text-3xl">Let me know</p>
          <p className="text-4xl">DM me</p>
          <a className="text-4xl" href="https://www.instagram.com/_tush_ar._._/">
          {" _tush_ar._._".split("").map((letter, index) => (
            <motion.span
              ref={(el) => (instaRefs.current[index] = el)} // Assign each letter ref
              whileHover={{ scale: 1.2, rotate: 50 }} // Slight rotation for emphasis
              whileTap={{ scale: 5, rotate: -10 }}
              transition={{ type: 'spring', stiffness: 100, damping: 1 }}
              key={index}
              className="cursor-pointer font-bold"
              style={{ display: 'inline-block' }}
              >
              {letter}
             </motion.span>
          ))}
          </a>
        </div>
    </div>
  )
}

export default Contact