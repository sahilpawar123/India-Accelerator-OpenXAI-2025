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

  const particlesLoaded = async (container?: Container) => {};

  const options: ISourceOptions = useMemo(
    () => ({
      preset: "stars",
      background: {
        color: {
          value: "#000000", // This can be any color
        },
        opacity: 0, // This makes the canvas transparent
      },
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
          },
        },
        color: {
          value: "#ffffff",
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: { min: 1, max: 2 },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          outModes: {
            default: "out",
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          onClick: {
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