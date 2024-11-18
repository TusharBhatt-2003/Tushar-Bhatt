import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Buttons = ({ color, textColor }) => {
  const buttonRefs = useRef([]);

  useEffect(() => {
    // Animate buttons coming from the bottom
    buttonRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { y: 100, opacity: 1 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 100%', // Start animation when the button is near the viewport
            end: 'top 10%',
            scrub: true, // Smooth scrolling
            toggleActions: 'play reverse play reverse', // Play animation and reverse it on scroll
          },
        },
      );
    });

    // Clean up ScrollTrigger instances
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  const buttonData = [
    {
      text: 'My CV',
      href: '/TusharBhatt_CV.pdf',
    },
    {
      text: 'My Resume',
      href: '/TusharBhatt_FrontEndDeveloper_Resume.pdf',
    },
  ];

  return (
    <div className="flex justify-evenly items-center select-none">
      {buttonData.map(({ text, href }, index) => (
        <a
          key={text}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          ref={(el) => (buttonRefs.current[index] = el)} // Attach ref to each button
          className="border-2 rounded-lg w-fit my-5 px-2 pt-1 flex justify-center items-center"
          style={{ borderColor: textColor, color: textColor }}
        >
          {text}
        </a>
      ))}
    </div>
  );
};

export default Buttons;
