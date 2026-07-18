"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export default function StarField() {
  const parallaxRef = useRef<THREE.Group>(null);
  const sparklesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const { pointer } = state;
    if (parallaxRef.current) {
      parallaxRef.current.rotation.y = THREE.MathUtils.lerp(
        parallaxRef.current.rotation.y,
        pointer.x * 0.12,
        0.03
      );
      parallaxRef.current.rotation.x = THREE.MathUtils.lerp(
        parallaxRef.current.rotation.x,
        -pointer.y * 0.08,
        0.03
      );
    }
    if (sparklesRef.current) {
      sparklesRef.current.position.x = THREE.MathUtils.lerp(
        sparklesRef.current.position.x,
        pointer.x * 2.2,
        0.02
      );
      sparklesRef.current.position.y = THREE.MathUtils.lerp(
        sparklesRef.current.position.y,
        pointer.y * 1.4,
        0.02
      );
      sparklesRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <group ref={parallaxRef}>
      <Stars radius={140} depth={80} count={9000} factor={3.4} saturation={0} fade speed={0.4} />

      <Stars radius={70} depth={40} count={2500} factor={2.2} saturation={0.2} fade speed={0.6} />

      <group ref={sparklesRef}>
        <Sparkles
          count={900}
          scale={[70, 40, 70]}
          size={2.2}
          speed={0.25}
          opacity={0.7}
          color="#ff8fc4"
          noise={1.2}
        />
        <Sparkles
          count={500}
          scale={[45, 25, 45]}
          size={3.5}
          speed={0.4}
          opacity={0.85}
          color="#ffffff"
          noise={0.6}
        />
        <Sparkles
          count={350}
          scale={[35, 20, 35]}
          size={4}
          speed={0.3}
          opacity={0.6}
          color="#c9a8ff"
          noise={0.9}
        />
      </group>
    </group>
  );
}
