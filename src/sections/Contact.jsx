import { useColor } from '../context/ColorContext';
import ContactEmail from '../Components/contact/contactEmail';
import SocialMedia from '../Components/contact/SocialMedia';
import Collab from '../Components/contact/Collab';
import AnimatedText from '../Components/AnimatedText';

function Contact() {
  const { color, textColor } = useColor();

  return (
    <div
      id="contactme"
      className='h-fit w-screen flex flex-col lg:flex-row justify-center items-center font-["Aero"] mb-10'
      style={{ backgroundColor: color, color: textColor }}
    >
      <ContactEmail />
      <div className="flex flex-col items-center md:flex-row lg:flex-col lg:w-1/2 md:w-full md:justify-evenly md:items-baseline">
        <div className=" flex flex-col lg:w-full lg:items-center lg:justify-center gap-5">
          <AnimatedText text="Find Me." textColor={textColor} />
          <SocialMedia textColor={textColor} />
        </div>
        <Collab color={color} textColor={textColor} />
      </div>
    </div>
  );
}

export default Contact;
