"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section10Canvas, { Section10CanvasRef } from "./Section10Canvas";
import Section10GovernanceHUD from "./Section10GovernanceHUD";

export default function Section10CompleteGovernance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<Section10CanvasRef>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || isReducedMotion) {
        return;
      }

      const frameObj = { frame: 0 };

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
        },
      }).to(
        frameObj,
        {
          frame: 299,
          snap: "frame",
          ease: "none",
          onUpdate: () => {
            canvasRef.current?.setFrame(frameObj.frame);
          },
        },
        0
      );
    },
    { scope: containerRef, dependencies: [isReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#000000] min-h-[500vh]"
      aria-label="Section 10 — One System. Complete Governance."
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#000000]">
        <a
          href="https://xite.meetkishore.in"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 w-full h-full z-20 cursor-pointer group flex flex-col justify-between p-6 sm:p-10 no-underline"
          title="Click anywhere to visit xite.meetkishore.in"
        >
          {/* Canvas Background */}
          <div className="absolute inset-0 w-full h-full z-0 transform-gpu">
            <Section10Canvas ref={canvasRef} />
          </div>

          {/* Top Governance HUD */}
          <div className="relative z-30 pt-4 pointer-events-none">
            <Section10GovernanceHUD activePillar="Interactive Experience" currentStep="Published" />
          </div>

          {/* Bottom Floating Interactive Launch Badge */}
          <div className="relative z-30 self-center mb-8 px-7 py-3.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-2xl text-white flex items-center gap-3 transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-black group-hover:border-white shadow-[0_0_40px_rgba(255,255,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse group-hover:bg-black" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">
              EXPLORE XITE PLATFORM — xite.meetkishore.in
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
}

