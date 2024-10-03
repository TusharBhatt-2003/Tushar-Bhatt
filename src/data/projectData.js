// File: projectData.js
// Import the images object
import { quizGame, navBar, grids } from '../assets/images/index';

const projectData = [
    {
        name: 'Quiz Game',
        image: quizGame,  // Use the image by its filename
        description: 'A simple quiz game where the player has to choose the answer, the game will keep track of the score and the player will get 2 point for right answer and -1 for wrong answer.',
        link: 'https://tusharbhatt-2003.github.io/Quiz-Game/',
        github: 'https://github.com/TusharBhatt-2003/Quiz-Game',
        technologies: 'JavaScript, CSS, Basic HTML',
        category: 'Game',
        bgColor: '#4800FD',
        pageBGcolor: '#F0EBFF'
      },
      {
        name: 'Snake',
        image: 'https://i.pinimg.com/originals/56/5b/6b/565b6ba3e787cfc2e10f48616fa9b2ed.gif',
        description: 'A normal snake game, the snake will grow when it eats the food, and the game restarts when it crashes on the wall, if you are playing this on desktop you can change the color of the snake by clicking "c".',
        link: 'https://tusharbhatt-2003.github.io/The-Snake-Game-/',
        github: 'https://github.com/TusharBhatt-2003/The-Snake-Game-',
        technologies: 'JavaScript, HTML & CSS',
        category: 'Game',
        bgColor: '#DA0000',
        pageBGcolor: '#F2F5A9'
      },
      {
        name: 'Jackpot',
        image: 'https://i.pinimg.com/originals/f5/36/0a/f5360a114e8d5c927d5c75342bbf19e3.gif',
        description: 'This slot machine game is a fun and simple web-based experience where players can deposit money, choose the number of lines to bet on, and spin the reels to win. With a clean, responsive design and intuitive controls. Players can track their balance, adjust their bets, and enjoy easy-to-understand instructions, making it perfect for casual gaming.',
        link: 'https://tusharbhatt-2003.github.io/Slot-Machine-Game/',
        github: 'https://github.com/TusharBhatt-2003/Slot-Machine-Game',
        technologies: 'JavaScript &^ CSS',
        category: 'Game',
        bgColor: '#F4F4DC',
        pageBGcolor: '#F45F5F'
      },
      {
        name: 'To Do App',
        image: 'https://i.pinimg.com/564x/50/0f/8d/500f8dd0ae4daa0e98ee0d9f41eeb443.jpg',
        description: 'A basic to-Do list app with the feature of changing themes (Light & Dark). The user can mark the tasks that he/she have completed and also clear them and filter the completed task and incompleted task.',
        link: 'https://tusharbhatt-2003.github.io/To---Do-List-App/',
        github: 'https://github.com/TusharBhatt-2003/To---Do-List-App',
        technologies: 'JavaScript & CSS',
        category: 'To-Do',
        bgColor: '#F5F5F5',
        pageBGcolor: '#7D7D85'
      },
      {
        name: 'To Do List',
        image: 'https://i.pinimg.com/564x/d9/96/4e/d9964e7423f1d3ddb07d80107a5893a3.jpg',
        description: 'Clean and minimal To-Do App with an edit task Feature.',
        link: 'https://to-do-dusky-omega.vercel.app/',
        github: 'https://github.com/TusharBhatt-2003/To-Do ',
        technologies: 'Next.js & Tailwind CSS',
        category: 'To-Do',
        bgColor: 'white',
        pageBGcolor: 'black'
      },
      {
        name: 'Animated Nav Bar',
        image: navBar,
        description: 'A minimalistic and beautiful animated navigation bar featuring a smooth, fluid jelly-like bubble animation on the icons. This project combines simplicity with an eye-catching design, creating an engaging user experience.',
        link: 'https://tusharbhatt-2003.github.io/Animated-Nav-Bar/',
        github: 'https://github.com/TusharBhatt-2003/Animated-Nav-Bar',
        technologies: 'HTML, CSS, JavaScript',
        category: 'UI',
        bgColor: '#D1C9FF',
        pageBGcolor: '#FFF8EB'
      },
      {
        name: 'Responsive Web Page',
        image: grids,
        description: 'I developed a multi-page website using CSS Grid to create a clean and organized layout. The site features a fully functional navigation menu that allows seamless browsing between pages. Designed with responsiveness in mind, the website adapts smoothly to desktop, tablet, and mobile screens, ensuring an optimal viewing experience across all devices.',
        link: 'https://tusharbhatt-2003.github.io/Grid-Layout-Page/',
        github: 'https://github.com/TusharBhatt-2003/Grid-Layout-Page',
        technologies: 'HTML, CSS',
        category: 'CSS',
        bgColor: '#F5F5F5',
        pageBGcolor: 'black'
      },
      {
        name: 'Sign Up / Log In',
        image: 'https://i.pinimg.com/564x/1a/c0/d6/1ac0d6106f215d16abaffa20a8e7ab76.jpg',
        description: 'This webpage is a responsive sign-up form with input validation for first name, email, password, and password confirmation. The page features a visually appealing design with custom icons and animations, ensuring a user-friendly experience. It also includes error messaging to guide users during form submission.',
        link: 'https://tusharbhatt-2003.github.io/SignUp-Login/',
        github: 'https://github.com/TusharBhatt-2003/SignUp-Login',
        technologies: 'HTML, CSS & JavaScript',
        category: 'UI',
        bgColor: '#E6D8D5',
        pageBGcolor: '#C87ABA'
      },
      {
        name: 'Password Generator',
        image: 'https://i.pinimg.com/originals/ca/e3/8f/cae38f960de6ff51b3f16ed7900c8567.gif',
        description: 'The user can generate a password with a length between 6 to 30 characters. There are options to include numbers and special characters, and the user can copy the password to their clipboard.',
        link: 'https://tusharbhatt-2003.github.io/Password-Generator/',
        github: 'https://github.com/TusharBhatt-2003/Password-Generator',
        technologies: 'React (Vite) & Tailwind CSS',
        category: 'Fuctionality',
        bgColor: '#3DA97A',
        pageBGcolor:'#0B0E0B'
      },
      // {
      //   name: 'Project Kappa',
      //   image: 'https://i.pinimg.com/564x/69/26/7c/69267c04db13b1ee3274d65214d1fbe8.jpg',
      //   description: 'An educational platform for learning coding through interactive lessons.',
      //   link: 'https://project-kappa.com',
      //   github: 'https://github.com/user/project-kappa',
      //   technologies: 'Vue, Vuex, Node.js',
      //   category: 'education',
      //   bgColor: '#F4F5E8',
      //   pageBGcolor: '#2FF568'
      // },
      // {
      //   name: 'Project Lambda',
      //   image: 'https://i.pinimg.com/564x/07/5f/85/075f857053bd445e494cf39fdc0bacd9.jpg',
      //   description: 'A decentralized finance (DeFi) application built on Ethereum.',
      //   link: 'https://project-lambda.com',
      //   github: 'https://github.com/user/project-lambda',
      //   technologies: 'Solidity, React, Web3.js',
      //   category: 'DeFi',
      //   bgColor: '#000000',
      //   pageBGcolor: '#0E3EE6'
      // }
    ];
  
  export default projectData;
  