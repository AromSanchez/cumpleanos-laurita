"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

import StarField from "@/components/StarField";
import BlackHole from "@/components/BlackHole";
import HeartParticles from "@/components/HeartParticles";
import OrbitingHearts from "@/components/OrbitingHearts";
import FloatingMessages from "@/components/FloatingMessages";

export default function Experience() {
  return (
    <Canvas
      className="stage"
      camera={{ position: [0, 7, 34], fov: 55, near: 0.1, far: 1200 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#020006"]} />
      <fog attach="fog" args={["#08010f", 45, 150]} />

      <ambientLight intensity={0.18} color="#ff9fce" />
      <pointLight position={[0, 4, 0]} intensity={6} color="#ff2d78" distance={70} decay={2} />
      <pointLight position={[0, 20, -10]} intensity={1.2} color="#c9a8ff" distance={120} />

      <Suspense fallback={null}>
        <StarField />
        <BlackHole />
        <HeartParticles />
        <OrbitingHearts />
        <FloatingMessages />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={9}
        maxDistance={75}
        autoRotate
        autoRotateSpeed={0.22}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.5}
        zoomSpeed={0.65}
        minPolarAngle={Math.PI * 0.12}
        maxPolarAngle={Math.PI * 0.88}
      />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.12}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.85}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.0006, 0.0006)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.15} darkness={0.95} />
      </EffectComposer>
    </Canvas>
  );
}
