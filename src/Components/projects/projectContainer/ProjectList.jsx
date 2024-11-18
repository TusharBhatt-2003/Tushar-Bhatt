import ProjectCard from '../Projectcard/ProjectCard';

const ProjectList = ({
  projects,
  activeProjectName,
  setActiveProjectName,
  cardRefs,
}) => {
  return (
    <>
      <div className="md:hidden projectWindow flex justify-center gap-4 md:w-[60vw] px-5 select-none lg:pb-0 pb-10">
        {/* Column 1 */}
        <div className="flex flex-col w-1/2 gap-4">
          {projects
            .filter((_, index) => index % 2 === 0) // Projects for Column 1
            .map((project, index) => (
              <ProjectCard
                ref={(el) => (cardRefs.current[index] = el)}
                key={index}
                className="w-full"
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

        {/* Column 2 */}
        <div className="flex flex-col w-1/2 gap-y-4">
          {projects
            .filter((_, index) => index % 2 !== 0) // Projects for Column 2
            .map((project, index) => (
              <ProjectCard
                ref={(el) => (cardRefs.current[index] = el)}
                key={index}
                className="w-full"
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
      </div>
      <div className="hidden  projectWindow md:flex flex-wrap justify-center gap-4 md:w-[60vw] px-5 select-none lg:pb-0 pb-10">
        {projects.map((project, index) => (
          <ProjectCard
            ref={(el) => (cardRefs.current[index] = el)}
            key={index}
            className="w-full sm:w-[48%] lg:w-[48%] xl:w-[30%]" // Adjust column width based on screen size
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
    </>
  );
};

export default ProjectList;
