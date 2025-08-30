"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadStarsPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      preset: "stars",
      background: {
        color: {
          value: "#0f172a", // slate-900
        },
      },
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800, // This property is correct in the preset
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: { min: 1, max: 2 }, // Updated size format
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          outModes: { // Renamed from out_mode
            default: "out",
          },
        },
      },
      interactivity: {
        events: {
          onHover: { // Renamed from onhover
            enable: true,
            mode: "repulse",
          },
          onClick: { // Renamed from onclick
            enable: true,
            mode: "push",
          },
        },
      },
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
}