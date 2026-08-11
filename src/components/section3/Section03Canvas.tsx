"use client";

import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { useSequenceLoader } from "@/lib/useSequenceLoader";

export interface Section03CanvasRef {
  setFrame: (index: number) => void;
}

interface Section03CanvasProps {
  totalFrames?: number;
  className?: string;
  inView?: boolean;
}

const Section03Canvas = forwardRef<Section03CanvasRef, Section03CanvasProps>(
  ({ totalFrames = 300, className, inView = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(inView);
    const currentFrameRef = useRef(0);

    // IntersectionObserver for proximity preloading
    useEffect(() => {
      if (inView) {
        setIsInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { rootMargin: "600px 0px 600px 0px" }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, [inView]);

    const { getNearestLoadedFrame } = useSequenceLoader({
      sectionPath: "/section3",
      totalFrames,
      step: 4,
      inView: isInView,
    });

    const renderFrame = useCallback(
      (frameIdx: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = getNearestLoadedFrame(frameIdx);
        if (!img) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.naturalWidth || 1920;
        const imgHeight = img.naturalHeight || 1080;

        const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const x = (canvasWidth - imgWidth * scale) / 2;
        const y = (canvasHeight - imgHeight * scale) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
      },
      [getNearestLoadedFrame]
    );

    // Render initial frame once component mounts
    useEffect(() => {
      renderFrame(currentFrameRef.current);
    }, [renderFrame]);

    // Handle Window Resize for canvas resolution
    useEffect(() => {
      const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        renderFrame(currentFrameRef.current);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [renderFrame]);

    // Expose setFrame method to GSAP ScrollTrigger
    useImperativeHandle(
      ref,
      () => ({
        setFrame: (index: number) => {
          const clampedIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(index)));
          currentFrameRef.current = clampedIndex;
          requestAnimationFrame(() => renderFrame(clampedIndex));
        },
      }),
      [totalFrames, renderFrame]
    );

    return (
      <div ref={containerRef} className="relative w-full h-full">
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover transform-gpu will-change-transform ${className}`}
        />
      </div>
    );
  }
);

Section03Canvas.displayName = "Section03Canvas";

export default Section03Canvas;
