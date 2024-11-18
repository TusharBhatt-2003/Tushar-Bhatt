import { motion } from 'framer-motion';

const ProjectCard = ({
  name,
  image,
  github,
  category,
  bgColor,
  onMouseEnter,
  onMouseLeave,
  isActive,
  pageBGcolor,
  link,
}) => {
  // Helper function to check if the file is a video
  const isVideo = (file) => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const fileExtension = file?.split('.').pop();
    return videoExtensions.includes(fileExtension);
  };

  return (
    <motion.div
      aria-label={`Project card for ${name}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 900, damping: 10 }}
      className={`project-card lg:p-1 p-2 md:w-fit h-fit rounded-xl shadow-lg font-['Aero']`}
      style={{
        backgroundColor: isActive ? bgColor : 'white',
        transition: 'background-color 1.5s ease-in-out, color 1.5s ease-in-out',
        cursor: 'pointer',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Project Media (Image or Video) */}
      {image && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} project link`}
          className="image-container lg:w-full lg:h-16 overflow-hidden rounded-lg block"
        >
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
        </a>
      )}

      {/* Project Name and Category */}
      <div className="flex flex-col h-full mt-5 pl-2 lg:hidden">
        <h3
          className="text-xl uppercase text-black font-['Integral']"
          style={{
            color: isActive ? pageBGcolor : 'black',
            transition: 'color 0.5s ease-in-out',
          }}
        >
          {name}
        </h3>
        <div>
          <p
            className="text-semibold text-zinc-400 mt-1"
            style={{ color: isActive && pageBGcolor }}
          >
            {category}
          </p>

          {/* GitHub Link */}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="my-2 pt-1 px-1 rounded "
              style={{
                color: isActive ? bgColor : 'black',
                transition:
                  'color 0.5s ease-in-out, background-color 0.5s ease-in-out',
                backgroundColor: isActive ? pageBGcolor : 'white',
              }}
            >
              GitHub Repo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
