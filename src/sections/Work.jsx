import WeframeTechLogo from '../assets/logos/Weframe-Tech-logo';
import AnimatedText from '../Components/AnimatedText';
import { useColor } from '../context/ColorContext';

export default function Work() {
  const { color, textColor } = useColor();

  return (
    <div
      className="p-6 border-8 rounded-3xl font-['Aero'] bg-gray-100 flex flex-col items-center"
      style={{
        backgroundColor: textColor,
        color: color,
        '--after-bg-color': color,
        borderColor: color,
      }}
    >
      <div className="mb-20 mt-5">
        <AnimatedText text="Work Experience." textColor={textColor} />
      </div>

      <div className="flex">
        <div>
          <WeframeTechLogo color={color} />
        </div>
        <div
          className="shadow-md rounded-lg p-6 w-full max-w-md"
          style={{
            backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
              color.slice(3, 5),
              16,
            )}, ${parseInt(color.slice(5, 7), 16)}, 0.15)`, // Adjusts opacity to 15%
          }}
        >
          <h2 className="text-2xl font-semibold ">
            Internship at
            <a
              href="https://www.weframetech.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Weframe Tech
            </a>
          </h2>
          <p className=" mt-2">
            Currently working as an intern at{' '}
            <a
              href="https://www.weframetech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold hover:opacity-60"
            >
              Weframe Tech
            </a>
            , contributing to the development of modern headless CMS solutions
            using cutting-edge technologies like Builder.io, Medusajs,
            Directus.io in Next.js.
          </p>
          <p className=" mt-2">
            Responsibilities include developing dynamic and scalable web
            applications and delivering tailored solutions for diverse client
            needs.
          </p>
        </div>
      </div>
    </div>
  );
}
