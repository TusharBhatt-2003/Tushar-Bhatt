import { motion } from 'framer-motion';
import { SocialMediaLinks } from '../../const';

function SocialMedia({ textColor }) {
  return (
    <div className="social-media flex gap-5">
      {SocialMediaLinks.map(({ href, className, component }, index) => (
        <motion.a
          key={index}
          whileHover={{ scale: 0.9, opacity: 0.75 }}
          whileTap={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {component(textColor, 60)}
        </motion.a>
      ))}
    </div>
  );
}

export default SocialMedia;
