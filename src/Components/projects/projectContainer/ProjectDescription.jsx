import ProjectDesc from '../Projectcard/ProjectDesc';

const ProjectDescription = ({ project }) => {
  if (!project) return null;

  return (
    <div className="lg:flex hidden w-[20vw] flex-row lg:w-1/3 lg:h-3/4">
      <ProjectDesc
        className="projectDesc"
        name={project.name}
        description={project.description}
        technologies={project.technologies}
        image={project.image}
        github={project.github}
        category={project.category}
        bgColor={project.bgColor}
        pageBGcolor={project.pageBGcolor}
      />
    </div>
  );
};

export default ProjectDescription;
