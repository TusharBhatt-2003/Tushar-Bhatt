import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

function AnimatedText({
  text,
  textColor,
  animationConfig = {},
  textStyle = '',
  containerStyle = '',
}) {
  const letterRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const defaultConfig = {
      initial: { opacity: 1, y: 100, scale: 0 },
      animation: {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.3)',
      },
      threshold: 0.5,
    };

    const { initial, animation, threshold } = {
      ...defaultConfig,
      ...animationConfig,
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(letterRefs.current, initial, animation);
        }
      },
      { threshold },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [animationConfig]);

  return (
    <div
      className={`w-fit h-fit ${containerStyle}`}
      ref={sectionRef}
      style={{ borderColor: textColor }}
    >
      <h1
        className={`text-4xl lg:text-6xl font-bold font-['Integral'] ${textStyle}`}
      >
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            ref={(el) => (letterRefs.current[index] = el)}
            className="cursor-pointer"
            style={{
              display: 'inline-block',
              marginRight: letter === ' ' ? '1rem' : '0',
            }}
          >
            {letter}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}

export default AnimatedText;
