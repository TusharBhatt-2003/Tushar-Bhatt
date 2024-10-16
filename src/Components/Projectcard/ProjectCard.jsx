import { motion } from 'framer-motion';

const ProjectCard = ({ name, image, github, category, bgColor, onMouseEnter, onMouseLeave, isActive, pageBGcolor, link }) => {
  // Helper function to check if the file is a video
  const isVideo = (file) => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const fileExtension = file?.split('.').pop();
    return videoExtensions.includes(fileExtension);
  };

  return (
    <motion.a
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 5 }}
      className={`project-card p-2  w-fit h-fit rounded-xl shadow-2xl font-['Aero']`}
      style={{
        backgroundColor: isActive ? bgColor : "white",
        transition: 'background-color 1.5s ease-in-out',
        cursor: 'pointer',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={link}
    >
      {/* Project Media (Image or Video) */}
      {image && (
        <div className="image-container lg:w-full lg:h-16 overflow-hidden rounded-lg">
          {isVideo(image) ? (
            <video
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
          ) : (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Project Name and Category */}
      <div className="flex flex-col mt-5 pl-2 sm:hidden">
        <h3
          className="text-xl uppercase text-black font-['Integral']"
          style={{
            color: isActive ? pageBGcolor : "black", // Set text color to pageBGcolor when active
            transition: 'color 0.5s ease-in-out',
          }}
        >
          {name}
        </h3>
        <span className="text-semibold text-zinc-400 mt-1" style={{ color: isActive && pageBGcolor }}>
          {category}
        </span>

        {/* GitHub Link */}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline my-2"
            style={{
              color: isActive ? pageBGcolor : "black", // Set GitHub link color to pageBGcolor when active
              transition: 'color 0.5s ease-in-out',
            }}
          >
            GitHub Repo
          </a>
        )}
      </div>
    </motion.a>
  );
};

export default ProjectCard;
