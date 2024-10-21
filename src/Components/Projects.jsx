import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './Projectcard/ProjectCard';
import projectData from '../data/projectData';
import ProjectDesc from './Projectcard/ProjectDesc';
import { motion } from 'framer-motion';
import { useColor } from '../context/ColorContext';

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger with GSAP

const Projects = () => {
  const { color, textColor } = useColor();
  const letterRefs = useRef([]); // Reference for each letter
  const sectionRef = useRef(null); // Reference for the entire projects section
  const cardRefs = useRef([]); // Reference for project cards
  const catagoryRefs = useRef([]);
  const [activeProjectName, setActiveProjectName] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Featured');

  // Determine colors based on the active project or category
  const activeProject = projectData.find((project) => project.name === activeProjectName);
  const activeBgColor = activeProject ? activeProject.bgColor : color;
  const activePageBGcolor = activeProject ? activeProject.pageBGcolor : textColor || color;

  // Filter project data based on the selected category, including "Featured"
  const filteredProjects = activeCategory === 'All'
    ? projectData
    : activeCategory === 'Featured'
    ? projectData.filter((project) => project.featured)
    : projectData.filter((project) => project.category.includes(activeCategory));

  // Get all unique categories for filtering
  const categories = ['Featured', ...new Set(projectData.map((project) => project.category)),  'All'];
  const activeFilteredBgColor = activeProject ? activeProject.bgColor : textColor;
  const activeFilteredPageBGcolor = activeProject ? activeProject.pageBGcolor : color;

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
            }
          );

          gsap.fromTo(
            catagoryRefs.current,
            { opacity: 0, y: -1000 }, // Initial state: letters start lower with 0 opacity
            {
              opacity: 1,
              y: 0,
              duration: 2.5,
              stagger: 0.1, // Animate letters one by one
              ease: 'bounce.out',
            }
          );

          gsap.fromTo(
            cardRefs.current,
            { opacity: 0, x: 200 }, // Initial state: letters start lower with 0 opacity
            {
              opacity: 1,
              x: 0,
              duration: 2,
              stagger: 0.1, // Animate letters one by one
              ease: 'elastic.out(5, .7)',
            }
          );
        }
      },
      { threshold: 0.5 } // Trigger animation when 50% of the section is visible
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
      style={{ backgroundColor: activeFilteredPageBGcolor, transition: 'background-color 2s ease-in-out' }} // Background changes based on activeProject in filteredProjects
    >
      {/* Title Section */}
      <h1
        className="mt-10 lg:-mt-5 lg:w-1/6 text-6xl lg:text-8xl flex lg:flex-col justify-center lg:leading-[4.3rem] font-extrabold transition-colors duration-500 ease-in-out"
        style={{ color: activeFilteredBgColor, transition: 'color 2s ease-in-out' }} // Change color based on activeProject in filteredProjects
      >
        {/* Animate each letter in "Projects" */}
        {'projects'.split('').map((item, index) => (
          <motion.span
            transition={{ type: 'spring', stiffness: 900, damping: 5 }} // Define the type and intensity of the animation
            whileHover={{ scale: 1.2, rotate: -9 }} // Hover animation with scaling and slight rotation
            whileTap={{ scale: 0.9, rotate: 9 }} // Tap animation with reverse scaling and rotation
            ref={(el) => (letterRefs.current[index] = el)} // Assign each letter ref
            key={index}
            className="lg:text-left text-center drop-shadow cursor-pointer font-['Integral'] select-none"
          >
            {item}
          </motion.span>
        ))}
      </h1>

      {/* Category Filter Buttons */}
      <div className="categoryButtons py-5 w-full lg:w-1/6 flex justify-center lg:justify-start flex-wrap gap-2 select-none">
        {categories.map((category, index) => (
          <motion.button
            ref={(el) => (catagoryRefs.current[index] = el)}
            key={index}
            transition={{ type: 'spring', stiffness: 500, damping: 10, bounce: 100 }} 
            whileTap={{ scale: 0.6, }}
            className="p-2 pt-3 flex flex-col justify-center text-center rounded-lg text-sm font-bold transition-colors duration-500 ease-in-out"
            style={{
              backgroundColor: activeCategory === category ? activeFilteredBgColor : activeFilteredPageBGcolor,
              color: activeCategory === category ? activeFilteredPageBGcolor : activeFilteredBgColor,
              border: `2px solid ${activeFilteredBgColor}`,
              transition: 'background-color 3s ease-in-out, color 3s ease-in-out, border 3s sease-in-out',
            }}
            onClick={() => setActiveCategory(category)} // Set active category on button click
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="projectWindow justify-center w-[65vw] h-fit flex flex-wrap gap-4 px-5 select-none lg:pb-0 pb-10">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            ref={(el) => (cardRefs.current[index] = el)}
            key={index}
            className="break-inside"
            name={project.name}
            image={project.image}
            link={project.link}
            github={project.github}
            category={project.category}
            bgColor={project.bgColor}
            pageBGcolor={project.pageBGcolor} // Pass pageBGcolor to ProjectCard
            onMouseEnter={() => setActiveProjectName(project.name)} // Set active project by name on mouse enter
            onMouseLeave={() => setActiveProjectName(project.name)} // Clear active project on mouse leave
            isActive={activeProjectName === project.name} // Check if the project is active by name
          />
        ))}
      </div>

      {/* Project Description */}
      <div className={`lg:flex hidden flex-row lg:w-1/3 lg:h-3/4 ${activeProject ? '' : 'hidden'}`}>
        {activeProject && (
          <ProjectDesc
            className="projectDesc"
            name={activeProject.name}
            description={activeProject.description}
            technologies={activeProject.technologies}
            image={activeProject.image}
            github={activeProject.github}
            category={activeProject.category}
            bgColor={activeProject.bgColor}
            pageBGcolor={activeProject.pageBGcolor}
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
