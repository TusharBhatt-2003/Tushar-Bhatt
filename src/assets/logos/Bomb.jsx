// src/components/Bomb.jsx
import React from 'react';

function Bomb({ color = '#000', className = '', size = '32' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      fill={color} // Allow setting fill color through the color prop
    >
      <title>bomb</title>
      <path
        d="M15.9569 1.45706L14.539 2.87495L13.1248 1.45706L14.5427 0.0428467L15.9569 1.45706Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.707 5.707L13.123 4.29101L14.5354 5.70706L15.9532 4.28917L14.539 2.87495L13.123 4.28733L11.7106 2.87495L10.2928 4.29279L9 3L7.74293 4.25707C7.19135 4.08989 6.60617 4 6 4C2.68629 4 0 6.68629 0 10C0 13.3137 2.68629 16 6 16C9.31371 16 12 13.3137 12 10C12 9.39383 11.9101 8.80865 11.7429 8.25707L13 7L11.707 5.707ZM6 8C4.89543 8 4 8.89543 4 10H2C2 7.79086 3.79086 6 6 6V8Z"
        fill={color}
      ></path>
      <path
        d="M11.7107 0.0428467L13.1248 1.45706L11.707 2.87495L10.2928 1.45706L11.7107 0.0428467Z"
        fill={color}
      ></path>
    </svg>
  );
}

export default Bomb;
