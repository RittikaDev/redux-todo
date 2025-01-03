import React from "react";

const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="40"
      height="40"
      fill="none"
    >
      <rect width="100" height="100" rx="20" fill="#4CAF50" />
      <path
        d="M30 40L45 55L70 30"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="40" r="3" fill="white" />
      <circle cx="45" cy="55" r="3" fill="white" />
      <circle cx="70" cy="30" r="3" fill="white" />
    </svg>
  );
};

export default Logo;
