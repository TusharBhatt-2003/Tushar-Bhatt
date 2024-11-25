import { meImage, T } from '../const';
import { useColor } from '../context/ColorContext';

const Me = () => {
  const { color, textColor } = useColor();

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: color, color: textColor }}
    >
      {/* Main Section with Image */}
      <div className="relative group flex items-center mt-20 mx-5 ">
        <div className="relative group flex flex-col justify-center items-center">
          {/* Image */}
          <img
            src={meImage}
            loading="lazy"
            alt="My Image"
            className="w-52 object-fill rounded-xl group-hover:opacity-50 transition-opacity duration-300"
          />
          {/* Text Overlay */}
          <p className="absolute font-['themeFont'] text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            I was drunk
          </p>
        </div>
        <p className="m-4 w-full lg:text-lg font-['themeFont'] uppercase">
          Hi, I'm Tushar, a front-end developer passionate about art, coding,
          and creativity. Alongside my technical journey, I explore painting and
          sharing thoughts about life and self-expression.
        </p>
      </div>
      <p className='text-center font-["Bigger"] uppercase text-5xl'>
        Curruntly in built
      </p>
    </div>
  );
};

export default Me;
