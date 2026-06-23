"use client";

import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById("main");

    const handleScroll = () => {
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;

      // Check if the container itself has scrollable overflow
      if (scrollHeight > containerHeight && containerHeight > 0) {
        const docHeight = scrollHeight - containerHeight;
        setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      } else {
        // Fallback to window scroll (e.g. mobile/small screens where snap height is disabled)
        const winScroll = window.scrollY;
        const winHeight = window.innerHeight;
        const bodyHeight = document.documentElement.scrollHeight;
        const docHeight = bodyHeight - winHeight;
        setProgress(docHeight > 0 ? (winScroll / docHeight) * 100 : 0);
      }
    };

    // Attach listener to snap container (for snap height scrolling)
    container?.addEventListener("scroll", handleScroll, { passive: true });
    // Attach listener to window (for mobile/fallback scrolling)
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      container?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return progress;
}
