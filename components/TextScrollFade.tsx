"use client";
import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollFadeProps {
  children: ReactNode;
  delay?: number;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  className?: string;
}

export default function ScrollFade({ 
  children, 
  delay = 0, 
  speed = 0.6,
  direction = 'up',
  threshold = 0.1,
  className = ''
}: ScrollFadeProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const getTransform = (): string => {
    switch (direction) {
      case 'up':
        return 'translateY(30px)';
      case 'down':
        return 'translateY(-30px)';
      case 'left':
        return 'translateX(30px)';
      case 'right':
        return 'translateX(-30px)';
      default:
        return 'translateY(30px)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getTransform(),
        transition: `opacity ${speed}s ease-out ${delay}s, transform ${speed}s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}