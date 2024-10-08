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
        { id: 3, label: 'Resume', href: '#resume' },
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
                    duration: 1.5,
                    stagger: .2, // Animate letters one by one
                    ease: "bounce.out"

                }
            );
        } 
    }, [dropdownToggled]); // Run effect on toggle change

    return (
        <div className='md:hidden flex justify-center items-center drop-shadow-2xl'>
            <button onClick={() => setDropdownToggled(!dropdownToggled)}>
                <Hamburger size={30} color={textColor} />
            </button>
            {dropdownToggled && ( // Conditionally render the menu items
                <div 
                    className="dropdown-menu absolute -right-3 top-16 flex justify-center text-center flex-col-reverse rounded-xl border-2 drop-shadow-2xl"
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
