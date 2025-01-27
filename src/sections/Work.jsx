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
        <AnimatedText text="Work " textColor={textColor} />
        <AnimatedText text="Experience. " textColor={textColor} />
      </div>

      <div className="md:grid grid-cols-2 md:my-20 space-y-10">
        <div className="w-full grid place-content-center">
          <div
            className="p-5 rounded-xl"
            style={{
              backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
                color.slice(3, 5),
                16,
              )}, ${parseInt(color.slice(5, 7), 16)}, 0.5)`, // Adjusts opacity to 15%
            }}
          >
            <WeframeTechLogo color={textColor} />
          </div>
        </div>
        <div
          className="rounded-xl p-6 w-full max-w-md"
          style={{
            backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
              color.slice(3, 5),
              16,
            )}, ${parseInt(color.slice(5, 7), 16)}, 0.15)`, // Adjusts opacity to 15%
          }}
        >
          <h2 className="text-2xl font-semibold">
            Training at{' '}
            <a
              href="https://www.weframetech.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Weframe Tech
            </a>
          </h2>
          <ul className="list-disc pl-5">
            <li className="mt-2">
              Completed 1 month training at{' '}
              <a
                href="https://www.weframetech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold hover:opacity-60"
              >
                Weframe Tech
              </a>{' '}
              Contributing to the development of modern headless CMS solutions
              using cutting-edge technologies like Builder.io, Medusajs,
              Directus.io in Next.js.
            </li>
            <li className="mt-2">
              Learned developing dynamic and scalable web applications and
              delivering tailored solutions for diverse client needs.
            </li>
            <li className="font-bold text-lg">From 24 Dec, To 24 Jan .</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
