import { motion } from 'framer-motion';

const ProjectDesc = ({
  name,
  description,
  technologies,
  category,
  bgColor = '#ffffff', // Default background color if not provided
  pageBGcolor = '#000000', // Default page background color if not provided
  link,
  github,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: 'spring',
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      }}
      className="project-desc paper overflow-hidden self-center space-y-5 px-10 py-5 h-fit w-fit rounded-3xl shadow-lg" // Tailwind CSS classes for transition
      style={{
        backgroundColor: bgColor,
        transition: 'background-color 1.5s ease-in-out, color 1.5s ease-in-out', // Smooth background transition
      }}
    >
      {/* Global style tag for the inverted-selection ::selection */}
      <style>
        {`
          .project-desc .inverted-selection::selection {
            background: ${pageBGcolor} !important; /* Apply the background color for selected text */
            color: ${bgColor} !important; /* Text color during selection */
            transition: 'background-color 1.5s ease-in-out, color 1.5s ease-in-out'
          }
        `}
      </style>

      {/* Content with the custom ::selection class */}
      <div
        className="inverted-selection"
        style={{
          color: pageBGcolor,
          transition:
            'color 1.5s ease-in-out, background-color 1.5s ease-in-out',
        }} // Text color transition
      >
        <h2 className="text-3xl font-bold mb-4 font-['Integral'] inverted-selection">
          {name}
        </h2>
        <p className="text-xs mb-4 inverted-selection font-['Aero']">
          {description}
        </p>
        <p className="text-xs inverted-selection font-['Aero']">
          <h1 className="text-md inverted-selection font-extrabold">
            Technologies:{' '}
          </h1>
          {technologies}
        </p>
        <a
         target="_blank"
         rel="noopener noreferrer"
          href={github}
          className="font-extrabold inverted-selection font-['Aero']"
        >
          GitHub Repo
        </a>
        <p className="text-xs mt-2 uppercase inverted-selection font-['Aero'] opacity-70 mb-5">
          {category}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectDesc;
