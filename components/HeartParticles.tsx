"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 6000;

function heartPoint(t: number) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  return { x, y };
}

export default function HeartParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const colorA = new THREE.Color("#ff2d78"); // rosa intenso
    const colorB = new THREE.Color("#ffffff"); // blanco brillante
    const colorC = new THREE.Color("#ff8fc4"); // rosa suave

    const SCALE = 0.62;

    for (let i = 0; i < COUNT; i++) {
      const t = Math.random() * Math.PI * 2;
      const fill = Math.pow(Math.random(), 0.45);
      const { x, y } = heartPoint(t);

      const px = x * SCALE * fill + (Math.random() - 0.5) * 0.7;
      const py = y * SCALE * fill + (Math.random() - 0.5) * 0.7;
      const pz = (Math.random() - 0.5) * 2.6;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      const mixed = colorA.clone();
      const r = Math.random();
      if (r < 0.34) mixed.copy(colorA);
      else if (r < 0.67) mixed.copy(colorB);
      else mixed.copy(colorC);

      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;

      sizes[i] = Math.random() * 0.6 + 0.25;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = 11 + Math.sin(t * 0.4) * 0.5;
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.25;
    }
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.size = 0.34 + Math.sin(t * 1.6) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 11, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.34}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
