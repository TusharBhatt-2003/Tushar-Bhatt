import { T } from '../const';
import { useColor } from '../context/ColorContext'; // Import the context hook
import { colors } from '../data/colorData'; // Import the colors data
import Footer from '../sections/Footer';

const ThemePage = () => {
  const { color, textColor, changeColor } = useColor(); // Use the ColorContext to get current colors

  return (
    <div
      style={{ backgroundColor: color, color: textColor }}
      className="w-full h-fit pt-10 flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl mt-10 mb-8">Select a Theme Color</h1>

      <div className="grid grid-cols-3 lg:grid-cols-4 mb-8 gap-7">
        {colors.map((theme, index) => (
          <div
            key={index}
            className="flex w-[25vw] lg:w-[20vw] lg:h-[20vh] flex-col items-center justify-center py-6 px-7 rounded-lg"
            style={{
              backgroundColor: theme.bgColor,
              color: theme.textColor,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => changeColor(theme.bgColor, theme.textColor)} // Change the theme on click
          >
            <p className='text-xl lg:text-5xl font-extrabold border-b-2 pb-1 font-["themeTUSHAR"]'
             style={{
              borderColor: theme.textColor
             }}
            >       
            {T}</p>
             <div className='mt-1 md:flex gap-1'>
             <p className='text-xs lg:text-lg font-["themeFont"]'>FrontEnd</p>
             <p className='text-xs lg:text-lg font-["themeFont"]'>developer</p>
             </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ThemePage;
