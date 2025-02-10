import { useColor } from '../../context/ColorContext';

const ParagraphSection = ({ paragraphs }) => {
  const { currentColorIndex } = useColor();

  return (
    <p className="text-2xl lg:w-[30vw] font-light mx-10 font-['Aero']">
      {paragraphs[currentColorIndex]}
    </p>
  );
};

export default ParagraphSection;
