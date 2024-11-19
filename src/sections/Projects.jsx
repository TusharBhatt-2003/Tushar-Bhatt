import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectData from '../data/projectData';
import { motion } from 'framer-motion';
import { useColor } from '../context/ColorContext';
import {
  ProjectList,
  ProjectDescription,
} from '../Components/projects/projectContainer/index.js';
gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger with GSAP

const Projects = () => {
  const { color, textColor } = useColor();

  const letterRefs = useRef([]); // Reference for each letter

  const sectionRef = useRef(null); // Reference for the entire projects section

  const catagoryRefs = useRef({}); // Ref for category buttons

  const cardRefs = useRef({}); // Ref for project cards

  const [activeProjectName, setActiveProjectName] = useState(null);

  const [activeCategory, setActiveCategory] = useState('Featured');

  // Determine colors based on the active project or category

  const activeProject = projectData.find(
    (project) => project.name === activeProjectName,
  );

  const activeBgColor = activeProject ? activeProject.bgColor : color;

  const activePageBGcolor = activeProject
    ? activeProject.pageBGcolor
    : textColor || color;

  // Memoize filtered projects to avoid recalculating on every render

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectData;

    if (activeCategory === 'Featured')
      return projectData.filter((project) => project.featured);

    return projectData.filter((project) =>
      project.category.includes(activeCategory),
    );
  }, [activeCategory, projectData]);

  // Get all unique categories for filtering

  const categories = useMemo(
    () => [
      'Featured',
      ...new Set(projectData.map((project) => project.category)),
      'All',
    ],
    [projectData],
  );

  const activeFilteredBgColor = activeProject
    ? activeProject.bgColor
    : textColor;

  const activeFilteredPageBGcolor = activeProject
    ? activeProject.pageBGcolor
    : color;

  // GSAP Animation for letters and project cards

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate the "Projects" text when the section is visible

          gsap.fromTo(
            letterRefs.current,

            { opacity: 0, y: 1000 }, // Initial state: letters start lower with 0 opacity

            {
              opacity: 1,

              y: 0,

              duration: 2,

              stagger: 0.1, // Animate letters one by one

              ease: 'elastic.out(1.5, .7)',
            },
          );

          gsap.fromTo(
            Object.values(catagoryRefs.current),

            { opacity: 0, y: -1000 }, // Initial state: letters start lower with 0 opacity

            {
              opacity: 1,

              y: 0,

              duration: 2.5,

              stagger: 0.1, // Animate letters one by one

              ease: 'bounce.out',
            },
          );

          gsap.fromTo(
            Object.values(cardRefs.current),

            { opacity: 0, x: 200 }, // Initial state: letters start lower with 0 opacity

            {
              opacity: 1,

              x: 0,

              duration: 2,

              stagger: 0.1, // Animate letters one by one

              ease: 'elastic.out(5, .7)',
            },
          );
        }
      },

      { threshold: 0.5 }, // Trigger animation when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef} // Attach the section reference for the IntersectionObserver
      id="projects"
      className="projectContainer h-fit lg:h-screen lg:px-10 flex lg:flex-row flex-col lg:justify-between items-center uppercase font-['Aero']"
      style={{
        backgroundColor: activeFilteredPageBGcolor,
        transition: 'background-color 1.5s ease-in-out',
      }} // Background changes based on activeProject in filteredProjects
    >
      {/* Title Section */}

      <h1
        className="mt-10 lg:-mt-5 lg:w-1/6 text-6xl lg:text-8xl flex lg:flex-col justify-center lg:leading-[4.3rem] font-extrabold transition-colors duration-500 ease-in-out"
        style={{
          color: activeFilteredBgColor,
          transition: 'color 1.5s ease-in-out',
        }} // Change color based on activeProject in filteredProjects
      >
        {/* Animate each letter in "Projects" */}

        {'projects'.split('').map((item, index) => (
          <motion.span
            transition={{ type: 'spring', stiffness: 900, damping: 5 }} // Define the type and intensity of the animation
            whileHover={{ scale: 1.2, rotate: -9 }} // Hover animation with scaling and slight rotation
            whileTap={{ scale: 0.9, rotate: 9 }} // Tap animation with reverse scaling and rotation
            ref={(el) => (letterRefs.current[index] = el)} // Assign each letter ref
            key={index}
            className="lg:text-left text-center drop-shadow cursor-pointer font-['Integral'] select-none hover:drop-shadow-2xl"
          >
            {item}
          </motion.span>
        ))}
      </h1>

      {/* Category Filter Buttons */}

      <div className="categoryButtons py-5 w-full lg:w-1/6 flex justify-center lg:justify-start flex-wrap gap-2 select-none">
        {categories.map((category, index) => (
          <motion.button
            ref={(el) => (catagoryRefs.current[category] = el)} // Assign ref to object
            key={index}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 10,
              bounce: 100,
            }}
            whileTap={{ scale: 0.6 }}
            aria-label={`View ${category} projects`} // Added ARIA label for accessibility
            className="p-2 pt-3 flex flex-col justify-center text-center rounded-lg text-sm font-bold transition-colors duration-500 ease-in-out"
            style={{
              backgroundColor:
                activeCategory === category
                  ? activeFilteredBgColor
                  : activeFilteredPageBGcolor,

              color:
                activeCategory === category
                  ? activeFilteredPageBGcolor
                  : activeFilteredBgColor,

              border: `2px solid ${activeFilteredBgColor}`,

              transition:
                'background-color 1.5s ease-in-out, color 1.5s ease-in-out, border 1.5s ease-in-out',
            }}
            onClick={() => setActiveCategory(category)} // Set active category on button click
          >
            {category}
          </motion.button>
        ))}
      </div>

      <ProjectList
        projects={filteredProjects}
        activeProjectName={activeProjectName}
        setActiveProjectName={setActiveProjectName}
        cardRefs={cardRefs}
      />
      <ProjectDescription project={activeProject} />
    </div>
  );
};

export default Projects;
