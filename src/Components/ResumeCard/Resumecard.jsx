import { useColor } from "../../context/ColorContext";
import { motion } from "framer-motion";

const ResumeCard = ({ title, items }) => {
  const { color, textColor } = useColor();

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      // whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 800, damping: 20 }}
      className="resume-card rounded-lg px-5 py-2 w-fit h-fit"
      style={{ backgroundColor: textColor, color: color }}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-1">
            {/* Check if the item has a link property */}
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-500"
                style={{ color }}
              >
                {item.title}
              </a>
            ) : (
              <span>{item.title}</span>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ResumeCard;
