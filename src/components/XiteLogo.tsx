import React from "react";

export interface XiteLogoProps {
  className?: string;
  size?: number;
  useImage?: boolean;
}

export default function XiteLogo({
  className = "w-5 h-5",
  size,
  useImage = true,
}: XiteLogoProps) {
  if (useImage) {
    return (
      <img
        src="/xite-logo.png"
        alt="XITE Logo"
        className={`object-contain inline-block shrink-0 ${className}`}
        style={size ? { width: size, height: size } : undefined}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <path
        d="M 18 10 L 45 48 C 48 52 48 58 45 62 L 18 90 L 32 90 L 52 64 C 55 60 55 50 52 46 L 32 10 Z"
        fill="currentColor"
      />
      <path
        d="M 18 35 L 36 50 L 18 65 L 26 65 L 40 52 C 41 51 41 49 40 48 L 26 35 Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M 82 10 L 55 48 C 52 52 52 58 55 62 L 82 90 L 68 90 L 48 64 C 45 60 45 50 48 46 L 68 10 Z"
        fill="currentColor"
      />
      <path
        d="M 82 35 L 64 50 L 82 65 L 74 65 L 60 52 C 59 51 59 49 60 48 L 74 35 Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  );
}
