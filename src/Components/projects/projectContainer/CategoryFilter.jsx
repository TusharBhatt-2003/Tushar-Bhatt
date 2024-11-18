import { motion } from 'framer-motion';

const CategoryFilter = ({
  categories,
  activeCategory,
  onCategorySelect,
  activeBgColor,
  inactiveBgColor,
}) => {
  return (
    <div className="categoryButtons py-5 w-full lg:w-1/6 flex justify-center lg:justify-start flex-wrap gap-2 select-none">
      {categories.map((category, index) => (
        <motion.button
          key={index}
          transition={{ type: 'spring', stiffness: 500, damping: 10, bounce: 100 }}
          whileTap={{ scale: 0.6 }}
          className="p-2 pt-3 flex flex-col justify-center text-center rounded-lg text-sm font-bold transition-colors duration-500 ease-in-out"
          style={{
            backgroundColor: activeCategory === category ? activeBgColor : inactiveBgColor,
            color: activeCategory === category ? inactiveBgColor : activeBgColor,
            border: `2px solid ${activeBgColor}`,
            transition: 'background-color 1.5s ease-in-out, color 1.5s ease-in-out, border 1.5s ease-in-out',
          }}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
