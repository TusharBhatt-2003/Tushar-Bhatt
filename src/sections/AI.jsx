import AnimatedText from '../Components/AnimatedText';
import P5Background from '../Components/P5Background';
import { useColor } from '../context/ColorContext';

export default function AI() {
  const { color, textColor } = useColor();

  const hexToRgba = (hex, alpha) => {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const backgroundColorWithOpacity = hexToRgba(textColor, 0.4);

  return (
    <section
      className="relative h-full font-['Aero'] rounded-xxl flex flex-col justify-center items-center py-16 px-6"
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {/* P5Background component */}
      <P5Background />
      {/* <AnimatedText text="Leveraging AI for Efficiency." textColor={textColor} /> */}

      <p
        className="text-5xl font-['Bright'] border-2 my-5 text-center p-5 rounded-xl backdrop-blur"
        style={{
          //backgroundColor: textColor,
          color: textColor,
          borderColor: textColor,
        }}
      >
        AI isn’t here to replace developers,
        <br />
        it’s here to empower them.
      </p>
      <div
        style={{
          borderColor: color,
          backgroundColor: backgroundColorWithOpacity,
          color: color,
        }}
        className="p-5 border-2 font-extrabold rounded-xl my-5 backdrop-blur"
      >
        <p className="max-w-2xl mx-auto text-lg opacity-80">
          I use AI as a tool to enhance productivity, automate repetitive tasks,
          and optimize workflows.
        </p>
        <p className="max-w-2xl mx-auto text-lg opacity-80 mt-4">
          With a solid foundation in programming, I know when and how to
          integrate AI effectively, ensuring quality and efficiency while
          maintaining complete control over my work.
        </p>
      </div>
    </section>
  );
}
