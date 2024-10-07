import { useColor } from "../../context/ColorContext";
import { motion } from "framer-motion";

const ResumeCard = ({ title, items }) => {
  const { color, textColor } = useColor();

  return (
  <div>
    {/* Style tag for custom ::selection styles */}
    <style>
        {`
          .inverted-selection::selection {
            background: ${color};
            color: ${textColor};
          }
        `}
      </style>
      <motion.div
      whileHover={{ scale: 1.05 }}
      transition={
        { type: "spring",
          stiffness: 800,
          damping: 25 }
          }
      className="resume-card rounded-lg px-5 py-2 w-fit h-fit inverted-selection" // Add custom class name
      style={{ backgroundColor: textColor, color: color }}
    >  
      <h3 className="text-lg font-semibold mb-2 inverted-selection">{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-1 inverted-selection">
            {/* Check if the item has a link property */}
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline inverted-selection"
                style={{ color }}
              >
                {item.title}
              </a>
            ) : (
              <p
              className="inverted-selection"
              >{item.title}</p>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  </div>
  );
};

export default ResumeCard;
