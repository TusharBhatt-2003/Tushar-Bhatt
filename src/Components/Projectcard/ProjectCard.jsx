import { motion } from 'framer-motion';

const ProjectCard = ({ name, image, github, category, bgColor, onMouseEnter, onMouseLeave, isActive, pageBGcolor, link }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 5 }}
      className={`project-card p-1 w-fit h-fit rounded-xl shadow-2xl`}
      style={{
        backgroundColor: isActive ? bgColor : "white",
        transition: 'background-color 1.5s ease-in-out',
        cursor: 'pointer',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={link}
    >
      {/* Project Image */}
      {image && (
        <div className="image-container first-line: lg:w-full lg:h-16 overflow-hidden rounded-lg">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Project Name and Category */}
      <div className="mb-2 mt-5 sm:hidden">
        <h3
          className="text-2xl font-semibold uppercase text-black"
          style={{
            color: isActive ? pageBGcolor : "black", // Set text color to pageBGcolor when active
            transition: 'color 0.5s ease-in-out',
          }}
        >
          {name}
        </h3>
        <span className="text-semibold text-zinc-400" style={{ color: isActive && pageBGcolor }}>
          {category}
        </span>
      </div>

      {/* GitHub Link */}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden hover:underline"
          style={{
            color: isActive ? pageBGcolor : "black", // Set GitHub link color to pageBGcolor when active
            transition: 'color 0.5s ease-in-out',
          }}
        >
          GitHub Repo
        </a>
      )}
    </motion.a>
  );
};

export default ProjectCard;
