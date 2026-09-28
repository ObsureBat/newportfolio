'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';
import { bgGradientVertexShader, bgGradientFragmentShader } from '@/lib/shaders/backgroundGradient';

export function AmbientLightscape() {
  const bgMatRef = useRef<THREE.ShaderMaterial>(null!);
  const lerpedMouseRef = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorBg: { value: new THREE.Color('#FAFAFA') },
    }),
    []
  );

  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const { scrollProgress, mousePos } = useAppStore.getState();
    const t = state.clock.getElapsedTime();
    const lerpFactor = 1.0 - Math.exp(-6.0 * delta);
    lerpedMouseRef.current.x += (mousePos.x - lerpedMouseRef.current.x) * lerpFactor;
    lerpedMouseRef.current.y += (mousePos.y - lerpedMouseRef.current.y) * lerpFactor;

    if (bgMatRef.current) {
      bgMatRef.current.uniforms.uTime.value = t;
      bgMatRef.current.uniforms.uScrollProgress.value = scrollProgress;
      bgMatRef.current.uniforms.uMouse.value.copy(lerpedMouseRef.current);
    }

    if (meshRef.current) {
      meshRef.current.position.y = state.camera.position.y;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -30]} scale={[180, 180, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        ref={bgMatRef}
        vertexShader={bgGradientVertexShader}
        fragmentShader={bgGradientFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        transparent={true}
        opacity={1.0}
      />
    </mesh>
  );
}

export default AmbientLightscape;
