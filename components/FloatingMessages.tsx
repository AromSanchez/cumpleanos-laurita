"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard, Float } from "@react-three/drei";
import * as THREE from "three";

const MESSAGES = [
  "",
  "Tus ojitos son preciosos",
  "Gracias por existir",
  "Admiro mucho lo empática que eres",
  "Tu forma de ser es algo que admiro mucho",
  "Tienes un corazón muy bonito",
  "Siempre encuentras la forma de alegrar a los demás",
  "Tu empatía es una de las cosas más bonitas de ti",
  "Qué bonito haber coincidido contigo",
  "Eres una persona muy especial",
  "Nunca pierdas esa esencia tan tuya",
  "Mereces todo lo bueno que te pase",
  "Hablar contigo siempre se siente bien",
  "Gracias por cada momento compartido",
  "Tienes una manera muy bonita de tratar a las personas",
  "Tu amabilidad te hace destacar",
  "Espero que nunca dudes de lo mucho que vales",
  "Eres única",
  "Tu amistad vale muchísimo",
  "Me alegra que formes parte de mi vida",
];

const PALETTE = ["#ffffff", "#ff8fc4", "#ff5da2", "#c9a8ff", "#ffd7e8"];

type MessageConfig = {
  text: string;
  position: [number, number, number];
  fontSize: number;
  color: string;
  floatSpeed: number;
  floatIntensity: number;
  rotationIntensity: number;
};

function buildConfigs(): MessageConfig[] {
  const n = MESSAGES.length;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  return MESSAGES.map((text, i) => {
    const t = i / Math.max(n - 1, 1);
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = goldenAngle * i;

    const radius = 16 + (i % 5) * 4.6 + Math.random() * 3;

    const x = radius * Math.sin(inclination) * Math.cos(azimuth);
    let y = radius * Math.cos(inclination) * 0.75;
    const z = radius * Math.sin(inclination) * Math.sin(azimuth);

    y += y >= 0 ? 2 : -2;

    return {
      text,
      position: [x, y, z] as [number, number, number],
      fontSize: 0.55 + Math.random() * 0.85,
      color: PALETTE[i % PALETTE.length],
      floatSpeed: 0.5 + Math.random() * 0.6,
      floatIntensity: 0.6 + Math.random() * 0.8,
      rotationIntensity: 0.15 + Math.random() * 0.25,
    };
  });
}

function Message({ config }: { config: MessageConfig }) {
  const textRef = useRef<any>(null);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!textRef.current) return;
    const t = clock.getElapsedTime();
    const pulse = 0.75 + Math.sin(t * 0.8 + seed) * 0.25;
    textRef.current.fillOpacity = pulse;
  });

  return (
    <Float
      speed={config.floatSpeed}
      floatIntensity={config.floatIntensity}
      rotationIntensity={config.rotationIntensity}
    >
      <Billboard position={config.position}>
        <Text
          ref={textRef}
          fontSize={config.fontSize}
          color={config.color}
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
          outlineWidth={config.fontSize * 0.035}
          outlineColor={config.color}
          outlineOpacity={0.35}
          letterSpacing={0.01}
          material-toneMapped={false}
          material-transparent
        >
          {config.text}
        </Text>
      </Billboard>
    </Float>
  );
}

export default function FloatingMessages() {
  const configs = useMemo(buildConfigs, []);

  return (
    <group>
      {configs.map((config, i) => (
        <Message key={i} config={config} />
      ))}
    </group>
  );
}
