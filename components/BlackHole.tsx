"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Genera una textura radial de degradado (rosa -> rojo -> púrpura -> transparente) en un canvas 2D. */
function useRadialTexture(stops: [number, string][], size = 512) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [stops, size]);
}

/** Genera una textura de anillo (disco de acreción) con bandas de color en degradado angular/radial. */
function useDiskTexture() {
  return useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const cx = size / 2;
    const cy = size / 2;

    const gradient = ctx.createRadialGradient(cx, cy, size * 0.14, cx, cy, size * 0.5);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.08, "rgba(255,230,240,0.95)");
    gradient.addColorStop(0.22, "rgba(255,120,180,0.9)");
    gradient.addColorStop(0.45, "rgba(255,45,120,0.75)");
    gradient.addColorStop(0.7, "rgba(255,59,59,0.35)");
    gradient.addColorStop(1, "rgba(120,20,60,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Vetas sutiles para dar textura de flujo al disco
    ctx.globalCompositeOperation = "overlay";
    for (let i = 0; i < 220; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = size * (0.16 + Math.random() * 0.32);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      const alpha = 0.05 + Math.random() * 0.12;
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, 1 + Math.random() * 2.4, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

export default function BlackHole() {
  const diskRef = useRef<THREE.Mesh>(null);
  const diskRef2 = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const diskTexture = useDiskTexture();
  const glowTexture = useRadialTexture([
    [0, "rgba(255,220,235,0.9)"],
    [0.25, "rgba(255,93,162,0.55)"],
    [0.55, "rgba(200,60,140,0.22)"],
    [1, "rgba(20,0,20,0)"],
  ]);

  useFrame((_, delta) => {
    if (diskRef.current) diskRef.current.rotation.z += delta * 0.09;
    if (diskRef2.current) diskRef2.current.rotation.z -= delta * 0.045;
    if (glowRef.current) {
      const t = performance.now() * 0.0006;
      const s = 1 + Math.sin(t) * 0.04;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Halo difuso detrás del agujero negro */}
      <mesh ref={glowRef} position={[0, 0, -0.5]}>
        <planeGeometry args={[26, 26]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={diskRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <ringGeometry args={[2.4, 8.5, 128]} />
        <meshBasicMaterial
          map={diskTexture}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={diskRef2} rotation={[Math.PI / 2.15, 0, 0.3]}>
        <ringGeometry args={[3.4, 5.6, 128]} />
        <meshBasicMaterial
          map={diskTexture}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>


      <mesh renderOrder={2}>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
