import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedText({
  text,
  textColor,
  animationConfig = {},
  textStyle = '',
  containerStyle = '',
}) {
  const sectionRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%', // Adjust this based on when you want the animation to start
        once: true, // Ensures animation runs only once
      },
    });

    tl.fromTo(
      letterRefs.current,
      { opacity: 1, scale: 0, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'elastic(1, .3)',
      },
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`w-fit h-fit ${containerStyle}`}
      style={{ borderColor: textColor }}
    >
      <h1
        className={`text-4xl lg:text-6xl font-bold font-['Integral']  ${textStyle}`}
      >
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            ref={(el) => (letterRefs.current[index] = el)}
            className="cursor-pointer inline-block"
            style={{ marginRight: letter === ' ' ? '1rem' : '0' }}
          >
            {letter}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}

export default AnimatedText;
