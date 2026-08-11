"use client";

import { useEffect, useState, useRef } from "react";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    const handleComplete = () => {
      setIsLoaded(true);
      setTimeout(() => setIsHidden(true), 500);
    };

    // 2.0s duration so user views the full-screen preloader animation smoothly
    const safetyTimeout = setTimeout(handleComplete, 2000);

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-black flex items-center justify-center transition-all duration-700 ease-out select-none ${
        isLoaded ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Full Screen Preloader Video Container */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/preloader.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onError={() => setIsHidden(true)}
          className="w-full h-full object-cover scale-[1.5] sm:scale-[1.6] md:scale-[1.7] transform-gpu pointer-events-none z-10"
        />

        {/* Specular Radial Ambient Glow Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-20" />
      </div>
    </div>
  );
}

