export default function Vercel({ color }) {
  return (
    <svg
      width="50px"
      height="64px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path d="M12 1L24 22H0L12 1Z" fill={color}></path>{' '}
      </g>
    </svg>
  );
}
