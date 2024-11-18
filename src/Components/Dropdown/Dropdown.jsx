import { useState, useRef, useEffect } from 'react';
import { useColor } from '../../context/ColorContext';
import { gsap } from 'gsap';
import { Spin as Hamburger } from 'hamburger-react';
import { Link } from 'react-scroll'; // Import Link from react-scroll

function Dropdown() {
  const { color, textColor } = useColor(); // Context values for color
  const [dropdownToggled, setDropdownToggled] = useState(false);
  const [activeItem, setActiveItem] = useState(null); // Track active menu item
  const [hoverItem, setHoverItem] = useState(null); // Track hover menu item
  const menuRefs = useRef([]);

  const menuItems = [
    { id: 4, label: 'Contact', href: 'contactme' },
    { id: 5, label: 'Projects', href: 'projects' },
    { id: 3, label: 'Resume', href: 'resume' },
    { id: 2, label: 'About', href: 'aboutme' },
    { id: 1, label: 'Home', href: 'landingPage' },
  ];

  // Effect to run the animation when the dropdown is toggled
  useEffect(() => {
    if (dropdownToggled) {
      // Animate menu items in
      gsap.fromTo(
        menuRefs.current,
        { opacity: 0, y: -100 }, // Initial state: letters start lower with 0 opacity
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1, // Animate letters one by one
          ease: 'bounce.out',
        },
      );
    }
  }, [dropdownToggled]); // Run effect on toggle change

  const handleClick = (id) => {
    setActiveItem(id); // Set the clicked item as active
    setDropdownToggled(false); // Close dropdown after clicking an item
  };

  const handleMouseEnter = (id) => {
    setHoverItem(id); // Set the hovered item
  };

  const handleMouseLeave = () => {
    setHoverItem(null); // Reset hover item when mouse leaves
  };

  return (
    <div className="md:hidden flex justify-center items-center drop-shadow-2xl">
      <button onClick={() => setDropdownToggled(!dropdownToggled)}>
        <Hamburger size={30} color={textColor} toggled={dropdownToggled} />
      </button>
      {dropdownToggled && ( // Conditionally render the menu items
        <div
          className="dropdown-menu paper absolute -right-3 top-16 flex justify-center text-center flex-col-reverse rounded-xl drop-shadow-2xl overflow-hidden"
          style={{
            backgroundColor: textColor,
            opacity: 0.9,
            color: color,
            borderColor: color,
          }}
        >
          {menuItems.map((menu, index) => (
            <Link
              key={menu.id}
              to={menu.href} // Use 'to' instead of 'href' for react-scroll
              smooth={true} // Enable smooth scrolling
              duration={1000} // Duration for smooth scrolling
            >
              <div
                onClick={() => handleClick(menu.id)} // Set active item on click
                onMouseEnter={() => handleMouseEnter(menu.id)} // Set hovered item on mouse enter
                onMouseLeave={handleMouseLeave} // Reset hover item on mouse leave
                className={`pb-1  pt-2 px-2 m-1 font-["Aero"] rounded-lg`} // Always add hover effect
                style={{
                  backgroundColor:
                    activeItem === menu.id
                      ? color
                      : hoverItem === menu.id
                        ? color
                        : '',
                  color:
                    activeItem === menu.id
                      ? textColor
                      : hoverItem === menu.id
                        ? textColor
                        : '',
                  borderColor: hoverItem === menu.id ? color : '',
                  opacity:
                    hoverItem === menu.id && activeItem !== menu.id ? 0.2 : 1, // Opacity for hovered item
                }}
                ref={(el) => (menuRefs.current[index] = el)} // Assign individual refs to each menu item
              >
                {menu.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
