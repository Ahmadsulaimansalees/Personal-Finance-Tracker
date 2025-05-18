import React from "react";
import Particles from "react-tsparticles";

const AnimatedBackground = () => (
  <Particles
    id="tsparticles"
    options={{
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: "#f8fafc" },
      particles: {
        number: { value: 40 },
        color: { value: ["#0ea5e9", "#a78bfa", "#f59e42"] },
        shape: { type: "circle" },
        opacity: { value: 0.2 },
        size: { value: { min: 2, max: 6 } },
        move: { enable: true, speed: 1, direction: "none", outModes: "out" },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: "repulse" } },
        modes: { repulse: { distance: 100, duration: 0.4 } },
      },
      detectRetina: true,
    }}
  />
);

export default AnimatedBackground;
