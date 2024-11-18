import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useColor } from '../context/ColorContext.jsx';
import {
  ProjectTitle,
  CategoryFilter,
  ProjectList,
  ProjectDescription,
} from '../Components/projects/projectContainer/index.js';

import projectData from '../data/projectData.js';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { color, textColor } = useColor();
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeProjectName, setActiveProjectName] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Featured');

  const activeProject = projectData.find((project) => project.name === activeProjectName);
  const activeBgColor = activeProject ? activeProject.bgColor : color;
  const activePageBGcolor = activeProject ? activeProject.pageBGcolor : textColor;

  const filteredProjects = activeCategory === 'All'
    ? projectData
    : activeCategory === 'Featured'
    ? projectData.filter((project) => project.featured)
    : projectData.filter((project) => project.category.includes(activeCategory));

  const categories = ['Featured', ...new Set(projectData.map((project) => project.category)), 'All'];

  useEffect(() => {
    // Add your GSAP animations here
  }, []);

  return (
    <div
      ref={sectionRef}
      id="projects"
      className="projectContainer h-fit lg:h-screen lg:px-10 flex lg:flex-row flex-col lg:justify-between items-center uppercase font-['Aero']"
      style={{ backgroundColor: activePageBGcolor, transition: 'background-color 1.5s ease-in-out' }}
    >
      <ProjectTitle text="projects" textColor={activeBgColor} />
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        activeBgColor={activeBgColor}
        inactiveBgColor={activePageBGcolor}
      />
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
