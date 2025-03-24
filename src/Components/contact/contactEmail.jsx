import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { contactData } from '../../const';
import { useColor } from '../../context/ColorContext';
import AnimatedText from '../AnimatedText';

const ContactEmail = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const sectionRef = useRef(null); // Ref for the section
  const headingRef = useRef(null);
  const btnRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State to track visibility
  const { color, textColor } = useColor();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(null);

    try {
      const result = await emailjs.send(
        'service_0vgr7dj', // Replace with your EmailJS Service ID
        'template_45r7bsi', // Replace with your EmailJS Template ID
        formData,
        'OJPE3wzs60YGavN-E', // Replace with your EmailJS Public Key
      );

      if (result.text === 'OK') {
        setResponseMessage(
          'Thank you for your message! I will get back to you soon.',
        );
        setFormData({});
      } else {
        setResponseMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setResponseMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Intersection Observer to trigger animation when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }, // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // GSAP animation
  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 0, scale: 0 }, // Initial state
        { opacity: 1, y: 0, scale: 1, duration: 3, ease: 'elastic(1, 0)' }, // Target state
      );
      gsap.fromTo(
        headingRef.current,
        { opacity: 1, y: -500, scale: 0 }, // Initial state
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power2.out' }, // Target state
      );
      gsap.fromTo(
        btnRef.current,
        { opacity: 1, y: 5000, scale: 0 }, // Initial state
        { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'elastic(.1, 3)' }, // Target state
      );
      // Stagger animation for form fields
      gsap.fromTo(
        '.form-field', // Target all form fields with this class
        { opacity: 0, x: 100, scale: 0 }, // Start state
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'bounce(1)',
          stagger: 0.3, // Stagger by 0.2 seconds
          delay: 0.1, // Start after a slight delay
        },
      );
    }
  }, [isVisible]);

  return (
    <div className="h-screen w-screen lg:w-1/2 flex justify-center items-center font-['Aero']">
      <div className="h-[80vh] grid place-content-center gap-10">
        <div className="space-y-2">
          <AnimatedText text="Contact Me." textColor={textColor} />
          <p className="" ref={sectionRef}>
            {contactData.message}
          </p>
        </div>
        <form
          className="flex flex-col items-center gap-5 font-['Aero']"
          onSubmit={handleSubmit}
        >
          <style>
            {`
        .placeholderStyle::placeholder {
          color: ${color};
          opacity: .5;
        }
      `}
          </style>
          {contactData.formFields.map((field, index) => (
            <div
              className="flex justify-center items-baseline gap-5"
              key={index}
            >
              <label className="block w-[25vw] lg:w-[10vw] font-['Integral'] form-field text-left mb-2 font-semibold">
                {field.label} :
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder}
                  name={field.name}
                  className="w-fit form-field rounded-md outline-none p-2 placeholderStyle"
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  style={{ backgroundColor: textColor, color: color }}
                />
              ) : (
                <input
                  placeholder={field.placeholder}
                  type={field.type}
                  name={field.name}
                  className={`w-fit rounded-md form-field  outline-none p-2 placeholderStyle`}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  style={{ backgroundColor: textColor, color: color }}
                />
              )}
            </div>
          ))}
          <button
            ref={btnRef}
            type="submit"
            className="px-4 w-fit mt-16 pb-3 py-2 rounded-lg border-2 font-['Integral']"
            style={{ borderColor: textColor }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : contactData.submitButton}
          </button>
        </form>
        {responseMessage && (
          <p
            className={`mt-4 ${
              responseMessage.includes('Thank you')
                ? `text-${textColor}`
                : 'text-red-500'
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactEmail;
