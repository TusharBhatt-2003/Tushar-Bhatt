import image from './assets/images/me.jpg';
// Constants for the whole webpage
const T = 'Tushar';
// About Me Section
const aboutName = 'Tushar Bhatt';

const aboutMeParagraph = `21-year-old front-end developer currently residing in Faridabad.
Freshly graduated with a BCA degree from MDU, I’ve been honing my skills in
web development and problem-solving. With a strong foundation in HTML,
CSS, and JavaScript, I’ve also delved into popular frameworks like
React, Vite, Tailwind, and Bootstrap. Eager to expand my expertise,
I’m currently diving into the MERN stack to become a well-rounded
full-stack developer.`;

const aboutMeParagraph2 = `Additionally, I'm exploring animation and motion libraries such as
Framer Motion, GSAP, and Locomotive, as well as 3D rendering with
React Three.`;

const aboutMeNote = `Please take a moment to explore my portfolio, where you'll find a
curated selection of my projects. If you are interested in working
together or have any inquiries, I would love to hear from you. Thank
you for visiting my portfolio!`;

// resume button
const buttonData = [
  {
    text: 'My CV',
    href: '/TusharBhatt_CV.pdf',
  },
  {
    text: 'My Resume',
    href: '/TusharBhatt_FrontEndDeveloper_Resume.pdf',
  },
];

// Footer section
const navLinks = [
  { id: 'landingPage', label: 'Home' },
  { id: 'aboutme', label: 'About me' },
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'Projects' },
  { id: 'contactme', label: 'Contact' },
];

const addressData = [
  {
    line: 'Faridabad, Haryana',
  },
  {
    line: 'Delhi NCR',
  },
  {
    line: 'INDIA',
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/TusharBhatt-2003',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tushar-bhatt-05b8b11a5/',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/_tush_ar._._/',
  },
];

const techUsed = [
  { name: 'React (Vite)', href: 'https://vite.dev/' },
  { name: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
  {
    name: 'Locomotive',
    href: 'https://locomotivemtl.github.io/locomotive-scroll/',
  },
  { name: 'GSAP', href: 'https://gsap.com/' },
  { name: 'Framer Motion', href: 'https://www.framer.com/motion/' },
];

const meImage =
  image ||
  'https://i.pinimg.com/736x/25/2a/76/252a7687712617700986fa5489b18a1f.jpg';

export {
  T,
  aboutName,
  aboutMeParagraph,
  aboutMeParagraph2,
  aboutMeNote,
  navLinks,
  addressData,
  socialLinks,
  techUsed,
  buttonData,
  meImage,
};
