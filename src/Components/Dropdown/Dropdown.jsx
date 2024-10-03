import { useState, useRef, useEffect } from 'react';
import { useColor } from '../../context/ColorContext';
import { gsap } from 'gsap';
import { Spin as Hamburger } from 'hamburger-react'

function Dropdown() {
    const { color, textColor } = useColor(); // Context values for color
    const [dropdownToggled, setDropdownToggled] = useState(false);
    const menuRefs = useRef([]);
    
    const menuItems = [
        { id: 1, label: 'Home', href: '/' },
        { id: 2, label: 'About', href: '#aboutme' },
        { id: 3, label: 'Services', href: '#resume' },
        { id: 4, label: 'Contact', href: '#contactme' },
        { id: 5, label: 'Projects', href: '#projects' },
    ];

    // Effect to run the animation
    useEffect(() => {
        if (dropdownToggled) {
            // Animate menu items in
            gsap.fromTo(
                menuRefs.current,
                { opacity: 0, y: -500 }, // Initial state: letters start lower with 0 opacity
                {
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    stagger: 0.1, // Animate letters one by one
                    ease: "bounce.out"

                }
            );
        } else {
            // Animate menu items out when the dropdown is closed
            // gsap.to(
            //     menuRefs.current,
            //     {
            //         opacity: 0,
            //         x: 50,
            //         duration: 1.5,
            //         stagger: 0.1,
            //         ease: "elastic.out(1, 0.3)"
            //     }
            // );
        }
    }, [dropdownToggled]); // Run effect on toggle change

    return (
        <div className='md:hidden flex justify-center items-center'>
            <button onClick={() => setDropdownToggled(!dropdownToggled)}>
                <Hamburger size={30} color={textColor} />
            </button>
            {dropdownToggled && ( // Conditionally render the menu items
                <div 
                    className="dropdown-menu absolute right-1 top-16 flex justify-center text-center flex-col-reverse rounded-xl border-2"
                    style={{ backgroundColor: textColor, opacity: 0.7, color: color, borderColor: color }}
                >
                    {menuItems.map((menu, index) => (
                        <a
                            ref={(el) => menuRefs.current[index] = el} // Assign individual refs to each menu item
                            className='hover:font-bold p-1 m-1 font-["Aero"]'
                            key={menu.id} 
                            href={menu.href}
                        >
                            {menu.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
