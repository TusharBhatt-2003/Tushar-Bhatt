'use client';
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useColor } from '../context/ColorContext';

const P5Background = () => {
  const sketchRef = useRef(null);
  const { color, textColor } = useColor();
  let rotationX = 0;
  let rotationY = 0;

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        p.angleMode(p.DEGREES);
        p.strokeWeight(2);
        p.noFill();
        p.stroke(textColor);
      };

      p.draw = () => {
        p.background(color);

        // Apply automatic rotation
        p.rotateX(rotationX);
        p.rotateY(rotationY);

        // Increment rotation values for continuous movement
        rotationX += 0.2; // Change the speed of rotation by adjusting this value
        rotationY += 0.2;

        // Create the cubes in the 3D space
        for (let zAngle = 0; zAngle < 180; zAngle += 30) {
          for (let xAngle = 0; xAngle < 360; xAngle += 30) {
            p.push();
            p.rotateZ(zAngle);
            p.rotateX(xAngle);
            p.translate(0, 400, 0);
            p.box(20);
            p.pop();
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);
    return () => p5Instance.remove();
  }, [color, textColor]);

  return (
    <div ref={sketchRef} className="absolute top-0 left-0 w-full h-full"></div>
  );
};

export default P5Background;
