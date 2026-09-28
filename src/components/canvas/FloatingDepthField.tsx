'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';

// Custom Shader for Framer-grade soft depth particles
const particleVertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  attribute float aSize;
  attribute float aSpeed;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    
    // Procedural organic float physics
    vec3 pos = position;
    float t = uTime * aSpeed + aPhase;
    pos.x += sin(t * 0.7) * 0.35 + (uMouse.x * 0.4 * (1.0 - abs(pos.z) / 5.0));
    pos.y += cos(t * 0.5) * 0.25;
    pos.z += sin(t * 0.4) * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Distance attenuation for physical depth of field
    float depth = -mvPosition.z;
    gl_PointSize = clamp(aSize * (85.0 / max(depth, 1.5)), 1.5, 7.0);

    // Dynamic alpha fade at camera near plane & far plane
    vAlpha = smoothstep(1.5, 3.5, depth) * smoothstep(16.0, 6.0, depth) * 0.4;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Perfect circular particle with soft Gaussian falloff
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float glow = smoothstep(0.5, 0.05, dist);
    gl_FragColor = vec4(vColor, vAlpha * glow);
  }
`;

export function FloatingDepthField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  
  // Kinetic sculptures refs
  const torusGroupRef = useRef<THREE.Group>(null!);
  const octahedronRef = useRef<THREE.Mesh>(null!);

  const isReducedMotion = useAppStore((s) => s.isReducedMotion);

  // Generate 750 depth particles across the 3D scroll corridor
  const particleCount = 750;
  const [positions, sizes, speeds, phases, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);
    const sp = new Float32Array(particleCount);
    const ph = new Float32Array(particleCount);
    const col = new Float32Array(particleCount * 3);

    // Warm-neutral palette with subtle amber, slate and pearl accents
    const palette = [
      new THREE.Color('#94A3B8'), // Slate
      new THREE.Color('#CBD5E1'), // Soft silver
      new THREE.Color('#E2E8F0'), // Pearl white
      new THREE.Color('#F97316'), // Subtle orange micro-spark
      new THREE.Color('#F59E0B'), // Subtle gold micro-spark
    ];

    for (let i = 0; i < particleCount; i++) {
      // Distribute along camera descent path (y: +4 down to -28)
      pos[i * 3 + 0] = (Math.random() - 0.5) * 26; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 32 - 12; // Y
      // Keep depth gracefully behind DOM layers (z: -1.5 to -6.5)
      pos[i * 3 + 2] = -Math.random() * 5.0 - 1.5; // Z

      sz[i] = Math.random() * 2.4 + 1.0;
      sp[i] = Math.random() * 0.6 + 0.2;
      ph[i] = Math.random() * Math.PI * 2;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3 + 0] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, sz, sp, ph, col];
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state, delta) => {
    if (isReducedMotion) return;

    const { scrollProgress, mousePos } = useAppStore.getState();
    const t = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mousePos.x, mousePos.y),
        0.08
      );
    }

    // Animate Sculptures with ethereal floating physics
    if (torusGroupRef.current) {
      torusGroupRef.current.rotation.x = -t * 0.2 + mousePos.y * 0.2;
      torusGroupRef.current.rotation.y = t * 0.15 + mousePos.x * 0.25;
      torusGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
      torusGroupRef.current.position.y = -4.5 + Math.cos(t * 0.7) * 0.25;
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.y = t * 0.3 + mousePos.x * 0.3;
      octahedronRef.current.rotation.z = t * 0.15;
      octahedronRef.current.position.y = -9.2 + Math.sin(t * 0.9) * 0.2;
    }
  });

  return (
    <group>
      {/* 3D Depth Particle Sea */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aSize"
            args={[sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-aSpeed"
            args={[speeds, 1]}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            args={[phases, 1]}
          />
          <bufferAttribute
            attach="attributes-aColor"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>

      {/* Floating Kinetic Sculpture 1: Concentric Gyroscopic Torus Rings (Experience Waypoint) */}
      <group
        ref={torusGroupRef}
        position={[-5.6, -4.5, 0.3]}
      >
        <mesh>
          <torusGeometry args={[1.15, 0.015, 16, 64]} />
          <meshBasicMaterial
            color="#8B5CF6"
            transparent={true}
            opacity={0.22}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[0.75, 0.015, 16, 48]} />
          <meshBasicMaterial
            color="#F97316"
            transparent={true}
            opacity={0.2}
          />
        </mesh>
      </group>

      {/* Floating Kinetic Sculpture 3: Faceted Octahedron (Research Waypoint) */}
      <mesh
        ref={octahedronRef}
        position={[5.4, -9.2, 0.5]}
      >
        <octahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial
          color="#0EA5E9"
          wireframe={true}
          transparent={true}
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

export default FloatingDepthField;
