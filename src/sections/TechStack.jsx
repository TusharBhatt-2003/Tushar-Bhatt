import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useColor } from '../context/ColorContext';
import Html from '../assets/techStack/Html';
import Css from '../assets/techStack/Css';
import TailwindCss from '../assets/techStack/TailwindCss';
import JavaScript from '../assets/techStack/JavaScript';
import ReactIcon from '../assets/techStack/React';
import Next from '../assets/techStack/Next';
import WebSocket from '../assets/techStack/WebSocket';
import Node from '../assets/techStack/Node';
import Gsap from '../assets/techStack/Gsap';
import Vercel from '../assets/techStack/Vercel';
import MongoDB from '../assets/techStack/MongoDB';
import Docker from '../assets/techStack/Docker';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const { color, textColor } = useColor();
  const marqueeRef = useRef(null);

  // Horizontal Loop Helper Function
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: 'none' },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    });

    let length = items.length,
      startX = items[0].offsetLeft,
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;

    // Setup elements' initial positions and percent-based movements
    gsap.set(items, {
      xPercent: (i, el) => {
        let w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
        xPercents[i] = (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100;
        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth;

    // Create timeline for horizontal looping animation
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop = distanceToStart + widths[i];

      tl.to(
        item,
        {
          xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
          duration: distanceToLoop / pixelsPerSecond,
        },
        0,
      ).fromTo(
        item,
        { xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100 },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
      );
    }

    return tl;
  }

  useEffect(() => {
    const scrollingText = marqueeRef.current;

    if (!scrollingText) return;

    const tl = horizontalLoop(scrollingText, {
      repeat: -1, // Loop indefinitely
    });

    let speedTween;

    // ScrollTrigger for controlling the animation based on scroll position
    ScrollTrigger.create({
      trigger: '.scrolling-text',
      onUpdate: (self) => {
        if (speedTween) speedTween.kill();
        speedTween = gsap
          .timeline()
          .to(tl, {
            timeScale: 3 * self.direction,
            duration: 0.25,
          })
          .to(
            tl,
            {
              timeScale: 1 * self.direction,
              duration: 1.5,
            },
            '+=0.5',
          );
      },
    });
  }, []);

  const hexToRgba = (hex, alpha) => {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const colorOpacity = hexToRgba(color, 0.6);

  const techIcons = [
    <Html color={colorOpacity} />,
    <Css color={colorOpacity} />,
    <TailwindCss color={colorOpacity} />,
    <JavaScript color={colorOpacity} />,
    <ReactIcon color={colorOpacity} />,
    <Next color={colorOpacity} />,
    <WebSocket color={colorOpacity} />,
    <Node color={colorOpacity} />,
    <Gsap color={colorOpacity} />,
    <Vercel color={colorOpacity} />,
    <MongoDB color={colorOpacity} />,
    <Docker color={colorOpacity} />,
  ];

  return (
    <div
      className="py-5 overflow-hidden"
      style={{ backgroundColor: textColor }}
    >
      {/* Marquee Wrapper */}
      <div ref={marqueeRef} className="scrolling-text flex w-full space-x-10">
        {/* Duplicate icons to ensure smooth transition */}
        {[...techIcons, ...techIcons, ...techIcons, ...techIcons].map(
          (Icon, index) => (
            <div key={index} className="flex items-center justify-center">
              {Icon}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
