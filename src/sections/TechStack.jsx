import { useColor } from '../context/ColorContext';
import Html from '../assets/techStack/Html';
import Css from '../assets/techStack/Css';
import TailwindCss from '../assets/techStack/TailwindCss';
import JavaScript from '../assets/techStack/JavaScript';
import React from '../assets/techStack/React';
import Next from '../assets/techStack/Next';
import WebSocket from '../assets/techStack/WebSocket';
import Node from '../assets/techStack/Node';
import Gsap from '../assets/techStack/Gsap';
import Vercel from '../assets/techStack/Vercel';
import MongoDB from '../assets/techStack/MongoDB';
import Docker from '../assets/techStack/Docker';

export default function TechStack() {
  const { color, textColor } = useColor();

  return (
    <div
      className="py-10 flex justify-around items-center"
      style={{
        backgroundColor: textColor,
        color: color,
      }}
    >
      <Html color={color} />
      <Css color={color} />
      <TailwindCss color={color} />
      <JavaScript color={color} />
      <React color={color} />
      <Next color={color} />
      <WebSocket color={color} />
      <Node color={color} />
      <Gsap color={color} />
      <Vercel color={color} />
      <MongoDB color={color} />
      <Docker color={color} />
    </div>
  );
}
