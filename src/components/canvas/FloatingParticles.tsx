'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null!);
  
  const count = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 40;
      pos[i + 1] = (Math.random() - 0.5) * 40;
      pos[i + 2] = (Math.random() - 0.5) * 20 - 10;
    }
    return pos;
  }, []);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      vel[i] = (Math.random() - 0.5) * 0.02;
      vel[i + 1] = (Math.random() - 0.5) * 0.02;
      vel[i + 2] = (Math.random() - 0.5) * 0.01;
    }
    return vel;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Wrap around
        if (positions[i] > 20) positions[i] = -20;
        if (positions[i] < -20) positions[i] = 20;
        if (positions[i + 1] > 20) positions[i + 1] = -20;
        if (positions[i + 1] < -20) positions[i + 1] = 20;
        if (positions[i + 2] > -5) positions[i + 2] = -15;
        if (positions[i + 2] < -15) positions[i + 2] = -5;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#CBD5E1"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default FloatingParticles;
