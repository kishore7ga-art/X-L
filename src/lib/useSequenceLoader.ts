"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseSequenceLoaderOptions {
  sectionPath: string; // e.g. "/section1"
  totalFrames?: number;
  step?: number; // Keyframe step, default 4 (every 4th frame loaded first)
  inView?: boolean;
  isHeroSection?: boolean;
}

export function useSequenceLoader({
  sectionPath,
  totalFrames = 300,
  step = 4,
  inView = true,
  isHeroSection = false,
}: UseSequenceLoaderOptions) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFlagsRef = useRef<boolean[]>(new Array(totalFrames).fill(false));
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload frames in 2 passes: Pass 1 keyframes, Pass 2 remaining frames
  useEffect(() => {
    if (!inView) return;

    let isMounted = true;
    const images: HTMLImageElement[] = imagesRef.current;
    const loadedFlags: boolean[] = loadedFlagsRef.current;

    // Ensure array capacity
    if (images.length === 0) {
      for (let i = 0; i < totalFrames; i++) {
        images.push(new Image());
      }
    }

    let count = 0;

    const loadSingleFrame = (idx: number) => {
      if (loadedFlags[idx]) return;

      const img = images[idx] || new Image();
      images[idx] = img;

      const frameNum = String(idx + 1).padStart(3, "0");
      // Use WebP format for fast 45%+ smaller bandwidth
      const primaryUrl = `${sectionPath}/ezgif-frame-${frameNum}.webp`;
      const fallbackUrl = `${sectionPath}/ezgif-frame-${frameNum}.jpg`;

      const handleLoad = () => {
        if (!isMounted) return;
        loadedFlags[idx] = true;
        count++;
        setLoadedCount((prev) => Math.min(totalFrames, prev + 1));

        // Dispatch global progress event for Hero Section preloader tracking
        if (isHeroSection && typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("xite:hero-progress", {
              detail: {
                loaded: count,
                total: totalFrames,
                percentage: Math.min(100, Math.round((count / (totalFrames / step)) * 100)),
              },
            })
          );
        }
      };

      img.onload = handleLoad;
      img.onerror = () => {
        // Fallback to JPEG if WebP fails
        img.onerror = handleLoad;
        img.src = fallbackUrl;
      };

      img.src = primaryUrl;
    };

    // Pass 1: Load keyframes immediately (every step-th frame)
    const keyframeIndices: number[] = [];
    for (let i = 0; i < totalFrames; i += step) {
      keyframeIndices.push(i);
    }
    if (keyframeIndices[keyframeIndices.length - 1] !== totalFrames - 1) {
      keyframeIndices.push(totalFrames - 1);
    }

    keyframeIndices.forEach(loadSingleFrame);

    // Pass 2: Interleave remaining frames smoothly in background idle time
    const idleTimer = setTimeout(() => {
      for (let i = 0; i < totalFrames; i++) {
        if (!loadedFlags[i]) {
          loadSingleFrame(i);
        }
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(idleTimer);
    };
  }, [sectionPath, totalFrames, step, inView, isHeroSection]);

  // Return nearest loaded frame index to guarantee zero flicker
  const getNearestLoadedFrame = useCallback(
    (targetIdx: number): HTMLImageElement | null => {
      const images = imagesRef.current;
      const loadedFlags = loadedFlagsRef.current;

      if (!images || images.length === 0) return null;

      const clamped = Math.min(totalFrames - 1, Math.max(0, targetIdx));

      // Direct match if loaded
      if (loadedFlags[clamped] && images[clamped]?.complete) {
        return images[clamped];
      }

      // Search outward for nearest loaded frame
      for (let offset = 1; offset < totalFrames; offset++) {
        const left = clamped - offset;
        const right = clamped + offset;

        if (left >= 0 && loadedFlags[left] && images[left]?.complete) {
          return images[left];
        }
        if (right < totalFrames && loadedFlags[right] && images[right]?.complete) {
          return images[right];
        }
      }

      // Fallback to first image if present
      return images[0]?.complete ? images[0] : null;
    },
    [totalFrames]
  );

  return {
    imagesRef,
    loadedCount,
    getNearestLoadedFrame,
  };
}
