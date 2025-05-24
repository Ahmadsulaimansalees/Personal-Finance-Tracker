import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedBackground = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Define an array of softer, more modern gradients
    const gradients = [
      "linear-gradient(to right top, #a6c0fe, #f68084)", // Soft blue to gentle pink
      "linear-gradient(to right top, #d299c2, #fef9d7)", // Muted purple to cream
      "linear-gradient(to right top, #cdb4db, #ffc8dd)", // Lavender to rose
      "linear-gradient(to right top, #8dbeb8, #e8d0b3)", // Dusty green to warm beige
      "linear-gradient(to right top, #b6e2d3, #a2e0ff)", // Mint to light blue
    ];

    let currentIndex = 0;

    const animateBackground = () => {
      gsap.to(backgroundRef.current, {
        opacity: 0,
        duration: 1.5, // Fade out current gradient
        onComplete: () => {
          currentIndex = (currentIndex + 1) % gradients.length;
          backgroundRef.current.style.backgroundImage = gradients[currentIndex];
          gsap.to(backgroundRef.current, {
            opacity: 1,
            duration: 2.5, // Fade in new gradient
            delay: 0.5, // Slight delay before fading in
            ease: "power2.inOut",
          });
        },
      });
    };

    // Set initial background
    backgroundRef.current.style.backgroundImage = gradients[currentIndex];

    // Set up interval for continuous animation
    const interval = setInterval(animateBackground, 8000); // Change gradient every 8 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
      style={{
        backgroundImage: "linear-gradient(to right top, #a6c0fe, #f68084)", // Initial gradient
      }}
    ></div>
  );
};

export default AnimatedBackground;
