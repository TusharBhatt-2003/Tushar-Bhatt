import ProjectCard from '../Projectcard/ProjectCard';

const ProjectList = ({
  projects,
  activeProjectName,
  setActiveProjectName,
  cardRefs,
}) => {
  return (
    <div className="projectWindow justify-center w-[60vw] h-fit flex flex-wrap gap-2 px-5 select-none lg:pb-0 pb-10">
      {projects.map((project, index) => (
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
          pageBGcolor={project.pageBGcolor}
          onMouseEnter={() => setActiveProjectName(project.name)}
          onMouseLeave={() => setActiveProjectName(project.name)}
          isActive={activeProjectName === project.name}
        />
      ))}
    </div>
  );
};

export default ProjectList;
