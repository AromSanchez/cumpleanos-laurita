"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function useHeartGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0;
    const y = 0;
    shape.moveTo(x, y + 0.5);
    shape.bezierCurveTo(x, y + 0.5, x - 0.5, y, x - 1, y + 0.5);
    shape.bezierCurveTo(x - 1.6, y + 1.1, x - 0.8, y + 1.85, x, y + 1.15);
    shape.bezierCurveTo(x + 0.8, y + 1.85, x + 1.6, y + 1.1, x + 1, y + 0.5);
    shape.bezierCurveTo(x + 0.5, y, x, y + 0.5, x, y + 0.5);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 3,
      curveSegments: 16,
    });
    geometry.center();
    geometry.rotateZ(Math.PI);
    return geometry;
  }, []);
}

type OrbitConfig = {
  radius: number;
  speed: number;
  inclination: number;
  phase: number;
  scale: number;
  color: string;
  yOffset: number;
};

function OrbitingHeart({ config, geometry }: { config: OrbitConfig; geometry: THREE.ExtrudeGeometry }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * config.speed + config.phase;
    if (!meshRef.current) return;
    meshRef.current.position.x = Math.cos(t) * config.radius;
    meshRef.current.position.z = Math.sin(t) * config.radius;
    meshRef.current.position.y =
      config.yOffset + Math.sin(t * 1.7 + config.phase) * config.inclination;
    meshRef.current.rotation.y = t * 1.2;
    meshRef.current.rotation.z = Math.sin(t * 0.6) * 0.3;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={config.scale}>
      <meshStandardMaterial
        color={config.color}
        emissive={config.color}
        emissiveIntensity={1.4}
        roughness={0.3}
        metalness={0.1}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function OrbitingHearts() {
  const geometry = useHeartGeometry();

  const configs = useMemo<OrbitConfig[]>(() => {
    const palette = ["#ff2d78", "#ff8fc4", "#ff3b3b", "#ffffff", "#c9a8ff"];
    return Array.from({ length: 16 }, (_, i) => ({
      radius: 6 + Math.random() * 14,
      speed: 0.06 + Math.random() * 0.12,
      inclination: 1 + Math.random() * 4,
      phase: Math.random() * Math.PI * 2,
      scale: 0.16 + Math.random() * 0.22,
      color: palette[i % palette.length],
      yOffset: -3 + Math.random() * 10,
    }));
  }, []);

  return (
    <group>
      {configs.map((config, i) => (
        <OrbitingHeart key={i} config={config} geometry={geometry} />
      ))}
    </group>
  );
}
