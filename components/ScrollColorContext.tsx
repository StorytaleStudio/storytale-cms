"use client";

import { useEffect, useState } from "react";

type ColorScheme = {
  menuBgColor: string;
  menuFontColor: string;
};

type SectionColors = {
  [key: string]: ColorScheme;
};

// Define color schemes for each section
export const sectionColors: SectionColors = {
  hero: {
    menuBgColor: "rgba(255, 255, 255, 0.2)",
    menuFontColor: "#ffffff",
  },
  dark: {
    menuBgColor: "rgba(0, 0, 0, 0.2)",
    menuFontColor: "#000000",
  },
  work: {
    menuBgColor: "rgba(0, 0, 0, 0.5)",
    menuFontColor: "#ffffff",
  },
  services: {
    menuBgColor: "rgba(255, 255, 255, 0.5)",
    menuFontColor: "#000000",
  },
  // Add more sections as needed
};

/**
 * Hook that detects which section a specific element is in
 * based on whether it intersects with the top 10% of that section
 */
export function useElementSectionColors(elementRef: React.RefObject<HTMLDivElement | null>) {
  const [currentColors, setCurrentColors] = useState<ColorScheme>(sectionColors.hero);

  useEffect(() => {
    const element = elementRef.current;
    
    const handleScroll = () => {
      if (!element) return;

      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + elementRect.height / 2; // Center of element

      // Get all sections with data-section attribute
      const sections = document.querySelectorAll("[data-section]");
      let activeSection = "hero";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const top10Percent = sectionTop + rect.height * 0.05;

        // Check if element is within the section and past the top 10%
        if (elementTop >= top10Percent && elementTop <= sectionBottom) {
          activeSection = section.getAttribute("data-section") || "hero";
        } else if (elementTop < top10Percent && elementTop >= sectionTop) {
          // If element is in the top 10%, use the previous section's color
          const sectionIndex = Array.from(sections).indexOf(section);
          if (sectionIndex > 0) {
            activeSection = sections[sectionIndex - 1].getAttribute("data-section") || "hero";
          }
        }
      });

      // Update colors if section changed
      const newColors = sectionColors[activeSection] || sectionColors.hero;
      setCurrentColors(newColors);
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return currentColors;
}