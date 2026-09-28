'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { AmbientLightscape } from './AmbientLightscape';
import { FloatingDepthField } from './FloatingDepthField';
import { FloatingParticles } from './FloatingParticles';

export function SceneContainer() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none select-none overflow-hidden"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', background: 'transparent' }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <CameraRig />
        <AmbientLightscape />
        <FloatingDepthField />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}

export default SceneContainer;

