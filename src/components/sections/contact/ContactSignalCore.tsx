'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ContactSignalCoreProps {
  isCtaHovered?: boolean;
}

// 4 distinct orbital ring configurations (radius, inclination angles, particle count, base speed)
const ORBIT_CONFIGS = [
  { radius: 1.25, rotX: 0.45, rotY: 0.25, rotZ: 0.1, speed: 0.65, particles: 2 },
  { radius: 1.75, rotX: -0.65, rotY: 0.55, rotZ: 0.35, speed: -0.5, particles: 3 },
  { radius: 2.25, rotX: 0.85, rotY: -0.35, rotZ: -0.45, speed: 0.4, particles: 2 },
  { radius: 2.75, rotX: -0.25, rotY: 0.85, rotZ: 0.65, speed: -0.32, particles: 3 },
];

function OrbitRing({
  radius,
  rotX,
  rotY,
  rotZ,
  speed,
  particles,
  isCtaHovered,
  onParticlePositions,
  ringIndex,
}: {
  radius: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  speed: number;
  particles: number;
  isCtaHovered: boolean;
  onParticlePositions: (index: number, pos: THREE.Vector3[]) => void;
  ringIndex: number;
}) {
  const ringRef = useRef<THREE.Group>(null!);
  const particlesRef = useRef<THREE.InstancedMesh>(null!);

  // Generate smooth circle geometry for the thin orbital trace
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  // Initial particle phase angles
  const particleAngles = useMemo(() => {
    return Array.from({ length: particles }, (_, i) => (i / particles) * Math.PI * 2);
  }, [particles]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const worldPosArr = useMemo(
    () => Array.from({ length: particles }, () => new THREE.Vector3()),
    [particles]
  );

  useFrame((_, delta) => {
    if (!ringRef.current || !particlesRef.current) return;

    const speedMultiplier = isCtaHovered ? 2.0 : 1.0;
    const currentSpeed = speed * delta * speedMultiplier;

    for (let i = 0; i < particles; i++) {
      particleAngles[i] += currentSpeed;
      const angle = particleAngles[i];
      const lx = Math.cos(angle) * radius;
      const lz = Math.sin(angle) * radius;

      dummy.position.set(lx, 0, lz);
      const particleScale = isCtaHovered ? 0.075 : 0.055;
      dummy.scale.set(particleScale, particleScale, particleScale);
      dummy.updateMatrix();

      particlesRef.current.setMatrixAt(i, dummy.matrix);

      // Compute world position for connection lines
      dummy.getWorldPosition(worldPosArr[i]);
    }

    particlesRef.current.instanceMatrix.needsUpdate = true;
    onParticlePositions(ringIndex, worldPosArr);
  });

  return (
    <group ref={ringRef} rotation={[rotX, rotY, rotZ]}>
      {/* Hairline Orbital Track */}
      <lineLoop geometry={lineGeometry}>
        <lineBasicMaterial
          color={isCtaHovered ? '#6366F1' : '#CBD5E1'}
          transparent
          opacity={isCtaHovered ? 0.55 : 0.35}
          linewidth={1}
        />
      </lineLoop>

      {/* Orbiting Satellite Particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, particles]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={isCtaHovered ? '#4F46E5' : '#18181B'} />
      </instancedMesh>
    </group>
  );
}

function SignalCoreMesh({ isCtaHovered }: { isCtaHovered: boolean }) {
  const rootGroupRef = useRef<THREE.Group>(null!);
  const nucleusRef = useRef<THREE.Mesh>(null!);
  const outerCageRef = useRef<THREE.Mesh>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  // Track positions of all orbiting particles to draw subtle radial signal connections
  const ringParticlePositions = useRef<THREE.Vector3[][]>(
    ORBIT_CONFIGS.map((c) => Array.from({ length: c.particles }, () => new THREE.Vector3()))
  );

  const totalLines = 10;
  const linePositions = useMemo(() => new Float32Array(totalLines * 2 * 3), [totalLines]);
  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geom;
  }, [linePositions]);

  const handleParticlePositions = (ringIndex: number, positions: THREE.Vector3[]) => {
    ringParticlePositions.current[ringIndex] = positions;
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const speedMult = isCtaHovered ? 1.8 : 1.0;

    // Smooth cursor parallax with spring damping
    if (rootGroupRef.current) {
      const targetRotX = -state.pointer.y * 0.35;
      const targetRotY = state.pointer.x * 0.45;

      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        0.06
      );
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        targetRotY + time * 0.08 * speedMult,
        0.06
      );
    }

    // Core breathing animation
    if (nucleusRef.current && outerCageRef.current) {
      const breath = Math.sin(time * 2.2) * 0.04;
      const baseScale = isCtaHovered ? 1.15 : 1.0;
      const finalScale = baseScale + breath;

      nucleusRef.current.scale.set(finalScale, finalScale, finalScale);
      outerCageRef.current.rotation.x += delta * 0.2 * speedMult;
      outerCageRef.current.rotation.y += delta * 0.25 * speedMult;
      outerCageRef.current.scale.set(finalScale * 1.35, finalScale * 1.35, finalScale * 1.35);
    }

    // Update dynamic connection lines from center nucleus to selected particles
    if (linesRef.current) {
      const posAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      let lineIdx = 0;
      const center = new THREE.Vector3(0, 0, 0);

      // Connect 2 particles from each ring to the core center
      for (let r = 0; r < ORBIT_CONFIGS.length && lineIdx < totalLines; r++) {
        const particles = ringParticlePositions.current[r];
        if (!particles) continue;

        for (let p = 0; p < Math.min(2, particles.length) && lineIdx < totalLines; p++) {
          const pt = particles[p];
          if (!pt) continue;

          const base = lineIdx * 6;
          // Point A: Core center
          arr[base] = center.x;
          arr[base + 1] = center.y;
          arr[base + 2] = center.z;

          // Point B: Satellite particle
          arr[base + 3] = pt.x;
          arr[base + 4] = pt.y;
          arr[base + 5] = pt.z;

          lineIdx++;
        }
      }

      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* 1. Central Indigo Nucleus Core */}
      <mesh ref={nucleusRef}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial
          color="#312E81"
          emissive={isCtaHovered ? '#6366F1' : '#4338CA'}
          emissiveIntensity={isCtaHovered ? 0.75 : 0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Faceted Indigo Outer Cage (Wireframe Shield) */}
      <mesh ref={outerCageRef}>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshBasicMaterial
          color={isCtaHovered ? '#818CF8' : '#6366F1'}
          wireframe
          transparent
          opacity={isCtaHovered ? 0.7 : 0.4}
        />
      </mesh>

      {/* 3. Subtle Connection Rays to Orbiting Particles */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={isCtaHovered ? '#6366F1' : '#94A3B8'}
          transparent
          opacity={isCtaHovered ? 0.5 : 0.2}
        />
      </lineSegments>

      {/* 4. Orbital Rings with Particles */}
      {ORBIT_CONFIGS.map((config, idx) => (
        <OrbitRing
          key={idx}
          ringIndex={idx}
          radius={config.radius}
          rotX={config.rotX}
          rotY={config.rotY}
          rotZ={config.rotZ}
          speed={config.speed}
          particles={config.particles}
          isCtaHovered={isCtaHovered}
          onParticlePositions={handleParticlePositions}
        />
      ))}
    </group>
  );
}

export function ContactSignalCore({ isCtaHovered = false }: ContactSignalCoreProps) {
  return (
    <div
      data-cursor="CONTACT"
      className="relative w-full h-[340px] sm:h-[420px] lg:h-[480px] flex items-center justify-center select-none"
    >
      {/* Subtle Ambient Radial Highlight */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 ${
          isCtaHovered ? 'bg-indigo-500/10 opacity-100' : 'bg-indigo-500/5 opacity-50'
        }`}
      />

      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-4, -3, -2]} intensity={0.8} color="#818CF8" />
        <SignalCoreMesh isCtaHovered={isCtaHovered} />
      </Canvas>

      {/* Technical Telemetry Axis Label Overlay */}
      <div className="pointer-events-none absolute bottom-3 right-4 sm:right-6 text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            isCtaHovered ? 'bg-indigo-600 animate-ping' : 'bg-zinc-400'
          }`}
        />
        <span>SIGNAL CORE · IDEA → SYSTEM → BUILD → SHIP</span>
      </div>
    </div>
  );
}

export default ContactSignalCore;
