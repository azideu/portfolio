"use client";

import { useEffect } from "react";

export default function DecryptionEffect() {
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;
      const el = target.closest(".shuffle-text") as HTMLElement | null;
      if (!el) return;

      let originalText = el.dataset.original;
      if (!originalText) {
        originalText = el.textContent || "";
        el.dataset.original = originalText;
      }

      let iterations = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existingInterval = (el as any)._intervalId;
      if (existingInterval) clearInterval(existingInterval);

      const newInterval = window.setInterval(() => {
        el.textContent = originalText!
          .split("")
          .map((char, index) => {
            if (char === " " || index < iterations) {
              return originalText![index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iterations >= originalText!.length) {
          clearInterval(newInterval);
        }
        iterations += 1 / 3;
      }, 30);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (el as any)._intervalId = newInterval;
    };

    // Use capturing phase delegation (third argument true) to capture enter events on elements with .shuffle-text
    document.addEventListener("mouseenter", handleMouseEnter, true);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter, true);
    };
  }, []);

  return null;
}
