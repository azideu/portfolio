"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let $instance: any = null;

    const initInteractiveEffects = async () => {
      // Dynamically load jQuery to ensure complete SSR safety
      const $ = (await import("jquery")).default;
      $instance = $;

      const $container = $(".snap-container");
      if ($container.length === 0) return;

      const checkReveals = () => {
        const containerHeight = $container.height() || 0;

        $(".scroll-reveal").each(function () {
          const $el = $(this);
          const offsetTop = $el.offset()?.top || 0;
          const elementHeight = $el.outerHeight() || 0;

          // Reveal element when 10% of it enters the snap-container viewport
          if (offsetTop < containerHeight - (elementHeight * 0.10)) {
            $el.addClass("revealed");
          }
        });
      };

      const handleScroll = () => {
        checkReveals();

        // Calculate scroll percentage inside the snap-container
        const scrollTop = $container.scrollTop() || 0;
        const scrollHeight = $container[0].scrollHeight || 0;
        const containerHeight = $container.height() || 0;
        
        let scrollPercent = 0;
        // If snap-container is scrollable (has scrollable overflow height)
        if (scrollHeight > containerHeight && containerHeight > 0) {
          const docHeight = scrollHeight - containerHeight;
          scrollPercent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
        } else {
          // Fallback to window scroll when container is auto-height (e.g. mobile/small heights)
          const winScroll = $(window).scrollTop() || 0;
          const winHeight = $(window).height() || 0;
          const bodyHeight = $(document).height() || 0;
          const docHeight = bodyHeight - winHeight;
          scrollPercent = docHeight > 0 ? Math.min((winScroll / docHeight) * 100, 100) : 0;
        }

        $("#scroll-progress-line").css("width", `${scrollPercent}%`);
        $("#scroll-progress-pct").text(`[${Math.round(scrollPercent)}%]`);
      };

      // Bind scroll event to the snap-container and window
      $container.on("scroll", handleScroll);
      $(window).on("scroll", handleScroll);

      // Shuffling text decrypt on hover
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
      $(document).on("mouseenter", ".shuffle-text", function () {
        const $el = $(this);
        const originalText = $el.data("original") || $el.text();
        if (!$el.data("original")) {
          $el.data("original", originalText);
        }
        
        let iterations = 0;
        const intervalId = $el.data("intervalId") as number | undefined;
        if (intervalId) {
          clearInterval(intervalId);
        }

        const newIntervalId = window.setInterval(() => {
          $el.text(
            originalText
              .split("")
              .map((char: string, index: number) => {
                if (char === " " || index < iterations) {
                  return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("")
          );

          if (iterations >= originalText.length) {
            clearInterval(newIntervalId);
          }
          iterations += 1 / 3;
        }, 30);

        $el.data("intervalId", newIntervalId);
      });

      // Run initial check
      setTimeout(() => {
        checkReveals();
        handleScroll();
      }, 150);
    };

    initInteractiveEffects();

    return () => {
      if ($instance) {
        $instance(".snap-container").off("scroll");
        $instance(window).off("scroll");
        $instance(document).off("mouseenter", ".shuffle-text");
      }
    };
  }, []);

  return null; // Side-effect utility component
}
