import { useColor } from '../../context/ColorContext'; // Import the context

const ParagraphSection = ({ paragraphs }) => {
  const { currentColorIndex } = useColor(); // Get currentColorIndex from context

  return (
    <p className="text-2xl lg:w-[30vw] font-light mx-10 font-['Aero']">
      {paragraphs[currentColorIndex]}{' '}
      {/* Display the paragraph corresponding to the currentColorIndex */}
    </p>
  );
};

export default ParagraphSection;
