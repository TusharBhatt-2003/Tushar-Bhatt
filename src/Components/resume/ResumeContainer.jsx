import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ResumeCard from './ResumeCard/Resumecard';
import resumeData from '../../data/resumeData';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ResumeContainer = () => {
  const leftCardsRef = useRef([]);
  const rightCardsRef = useRef([]);

  useEffect(() => {
    // Left cards animation
    leftCardsRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { x: '-100%', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true, // Smooth scrolling
            toggleActions: 'play reverse play reverse', // Reverse on scroll up
          },
        },
      );
    });

    // Right cards animation
    rightCardsRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { x: '100%', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true, // Smooth scrolling
            toggleActions: 'play reverse play reverse', // Reverse on scroll up
          },
        },
      );
    });

    // Clean up ScrollTrigger instances on unmount
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <div className="resume-container grid grid-cols-2 gap-4 ">
      {/* Left Cards */}
      <div className="flex flex-col gap-5">
        {['Education', 'Skills'].map((title, index) => (
          <div key={title} ref={(el) => (leftCardsRef.current[index] = el)}>
            <ResumeCard title={title} items={resumeData[title.toLowerCase()]} />
          </div>
        ))}
      </div>

      {/* Right Cards */}
      <div className="flex flex-col gap-5">
        {['Courses', 'Certificates'].map((title, index) => (
          <div key={title} ref={(el) => (rightCardsRef.current[index] = el)}>
            <ResumeCard title={title} items={resumeData[title.toLowerCase()]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeContainer;
