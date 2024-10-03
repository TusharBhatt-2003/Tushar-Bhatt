import { motion}  from 'framer-motion'

const ProjectDesc = ({ name, description, technologies, category, bgColor, pageBGcolor, link, github  }) => {
  return (
    <motion.div 
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001
        }
      }}
      className="project-desc self-center space-y-5 px-10 py-5 h-fit w-fit rounded-lg shadow-2xl" // Tailwind CSS classes for transition
      style={{ backgroundColor: bgColor ,  transition: 'background-color .5s ease-in-out' }} // Default background color if not provided
    >
    <div style={{ color: pageBGcolor,   transition: 'color .5s ease-in-out' }}>
    <h2 className="text-3xl font-bold mb-4 font-['Integral']"    
      >{name}</h2>
      <p className="text-xs mb-4">{description}</p>
      <p className="text-xs ">
        <strong>Technologies: </strong> {technologies}
      </p>
      <a href={github}
         className='font-extrabold'>Code</a>
      <p className="text-xs mt-2 uppercase">{category}</p>
    </div>
    </motion.div>
  );
};

export default ProjectDesc;
