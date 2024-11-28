import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useColor } from '../context/ColorContext';
import { colors } from '../data/colorData'; // Import colors array
import { addressData, navLinks, socialLinks, T, techUsed } from '../const';
import { Link } from 'react-scroll';

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
          ease: 'bounce',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom', // Start animation when section is in view
            toggleActions: 'play none none none',
          },
        },
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
        {T}
        <p className="text-lg font-['Aero'] mt-2">Frontend Developer</p>
      </h1>
      <div className="grid  grid-cols-2 lg:grid-cols-4 w-full  h-full">
        {/* Navigation Links */}
        <div
          className="nav   h-full border-r-2 grid place-content-center lg:border-r-2 lg:border-b-0 border-b-2"
          style={{ borderColor: color }}
        >
          <div
            className="flex h-full w-full flex-col  text-start justify-center lg:my-10 pb-5 "
            style={{ borderColor: color }}
            ref={(el) => (textRefs.current[1] = el)}
          >
            {navLinks.map((item) => (
              <p key={item.id}>
                <Link
                  to={item.id}
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="cursor-pointer"
                >
                  {item.label}
                </Link>
              </p>
            ))}
          </div>
        </div>

        {/* Address Section */}
        <div
          className="w-full h-full  grid place-content-center lg:border-r-2 lg:border-b-0 border-b-2 "
          style={{ borderColor: color }}
        >
          <div
            className="address  h-full text-start "
            style={{ borderColor: color }}
            ref={(el) => (textRefs.current[2] = el)}
          >
            {addressData.map((item, index) => (
              <p key={index}>{item.line}</p>
            ))}
          </div>
        </div>

        {/* Social Media Links */}
        <div
          className="w-full h-full border-r-2 grid place-content-center"
          style={{ borderColor: color }}
        >
          <div
            className="social-media  h-full text-start"
            style={{ borderColor: color }}
            ref={(el) => (textRefs.current[3] = el)}
          >
            <p>Follow Me On</p>
            <br />
            <ul
              className="flex flex-col underlineCssResume"
              style={{ '--after-bg-color': color }}
            >
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Used Section */}
        <div className="w-full h-full grid place-content-center">
          <div
            className="contact  h-full pt-10 text-start"
            style={{ borderColor: color }}
          >
            <div ref={(el) => (textRefs.current[4] = el)}>
              <p>
                Tech Used in <br /> This Website :
              </p>
              <ul
                className="flex flex-col underlineCssResume mt-5"
                style={{ '--after-bg-color': color }}
              >
                {techUsed.map((tech, index) => (
                  <li key={index}>
                    <a
                      href={tech.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tech.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="h-40 flex flex-col justify-end mb-5">
        <p>Designed and Created by Tushar Bhatt</p>
      </div>
    </div>
  );
};

export default Footer;
