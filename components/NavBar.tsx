"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useElementSectionColors } from "./ScrollColorContext";

const pages = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Stories", href: "/stories" },
  { name: "Contact", href: "/contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);
  const [linkHover, setLinkHover] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { menuBgColor, menuFontColor } = useElementSectionColors(navRef);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeIndex = pages.findIndex((p) => p.href === pathname);
  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;

  const itemHeight = 2; // rem
  const containerPadding = 0.5; // rem top/bottom
  const minimalHeight = `${itemHeight + containerPadding * 2}rem`;
  const expandedHeight = `${pages.length * itemHeight + containerPadding * 1}rem`;

  useEffect(() => {
    if (hovered) {
      const timer = setTimeout(() => {}, 200);
      return () => clearTimeout(timer);
    }
  }, [hovered]);

  const orderedPages = hovered
    ? pages
    : [pages[safeActiveIndex], ...pages.filter((_, i) => i !== safeActiveIndex)];

  return (
    <div
      ref={navRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        top: "2rem",
        right: "2rem",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: "0.25rem",
        background: menuBgColor,
        border: `1px solid ${menuFontColor}33`,
        backdropFilter: "blur(0.625rem)",
        transition: "height 0.4s ease, background 0.6s ease, border-color 0.6s ease",
        height: hovered ? expandedHeight : minimalHeight,
        width: "8rem",
        padding: `${containerPadding}rem 0`,
      }}
    >
      {orderedPages.map((page, idx) => {
        const isActive = idx === 0 && !hovered ? true : pathname === page.href;
        const showItem = hovered || isActive;

        return (
          <Link
            key={page.href}
            href={page.href}
            onMouseEnter={() => setLinkHover(page.href)}
            onMouseLeave={() => setLinkHover(null)}
            style={{
              display: showItem ? "flex" : "none",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              color: 'white',
              fontFamily: "var(--font-primary)",
              fontWeight: isActive ? "500" : "normal",
              fontSize: "0.875rem",
              letterSpacing: "0.05rem",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              opacity: showItem ? 1 : 0,
              transform: showItem ? "translateX(0)" : "translateX(0.625rem)",
              transition: `opacity 0.4s ease ${isActive ? "0s" : "0.4s"}, transform 0.4s ease ${isActive ? "0s" : "0.6s"}, color 0.6s ease`,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: "0.5rem",
                height: "0.5rem",
                background: isActive ? 'white' : "transparent",
                flexShrink: 0,
                transition: "background 0.6s ease",
              }}
            />
            <span
              style={{
                transition: "color 0.6s ease, transform 0.4s ease",
                transform:
                  linkHover === page.href && !isActive
                    ? "translateX(-0.125rem)"
                    : "translateX(0)",
              }}
            >
              {page.name}
            </span>
            {linkHover === page.href && !isActive && (
              <span
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  background: 'rgba(255,255,255,0.4)',
                  flexShrink: 0,
                  marginLeft: "0.25rem",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  transform: "translateX(0.125rem)",
                }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}