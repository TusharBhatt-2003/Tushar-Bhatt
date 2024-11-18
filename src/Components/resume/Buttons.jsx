import { motion } from 'framer-motion';

const Buttons = ({ color, textColor }) => {
  const buttonData = [
    {
      text: "My CV",
      href: "/TusharBhatt_CV.pdf",
    },
    {
      text: "My Resume",
      href: "/TusharBhatt_FrontEndDeveloper_Resume.pdf",
    },
  ];

  return (
    <div className="flex justify-evenly items-center select-none">
      {buttonData.map(({ text, href }) => (
        <motion.a
          key={text}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.1,
            backgroundColor: textColor,
            color: color,
            borderColor: color,
          }}
          whileTap={{ scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 1,
          }}
          className="border-2 rounded-lg w-fit my-5 px-2 pt-1 flex justify-center items-center"
          style={{ borderColor: textColor, color: textColor }}
        >
          {text}
        </motion.a>
      ))}
    </div>
  );
};

export default Buttons;
