'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/lib/store';

// Waypoint positions and target lookAts for scroll progression
const WAYPOINTS = [
  // 0: Hero (0.0 - 0.15)
  { pos: new THREE.Vector3(0, 0, 5.8), look: new THREE.Vector3(0, 0, 0), fov: 45 },
  // 1: About (0.15 - 0.32)
  { pos: new THREE.Vector3(0.3, -0.2, 6.2), look: new THREE.Vector3(0, -0.2, 0), fov: 45 },
  // 2: Experience (0.32 - 0.50)
  { pos: new THREE.Vector3(-0.3, -4.5, 6.2), look: new THREE.Vector3(0, -4.5, 0), fov: 45 },
  // 3: Research Spotlight (0.50 - 0.68)
  { pos: new THREE.Vector3(0, -9.0, 6.2), look: new THREE.Vector3(0, -9.0, 0), fov: 44 },
  // 4: Projects (0.68 - 0.85)
  { pos: new THREE.Vector3(0, -13.8, 6.8), look: new THREE.Vector3(0, -13.8, 0), fov: 45 },
  // 5: Skills (0.85 - 0.95)
  { pos: new THREE.Vector3(0, -18.5, 6.5), look: new THREE.Vector3(0, -18.5, 0), fov: 46 },
  // 6: Contact (0.95 - 1.00)
  { pos: new THREE.Vector3(0, -23.5, 10.5), look: new THREE.Vector3(0, -23.5, 0), fov: 42 },
];

// Pre-allocated static scratch vectors to avoid GC garbage creation inside render loop
const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();

export function CameraRig() {
  const { camera } = useThree();
  const isReducedMotion = useAppStore((s) => s.isReducedMotion);

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (isReducedMotion) {
      camera.position.set(0, 0, 6.5);
      camera.lookAt(0, 0, 0);
      return;
    }

    const { scrollProgress, mousePos } = useAppStore.getState();

    // Map scroll progress (0..1) to continuous spline waypoint interpolation
    const maxIdx = WAYPOINTS.length - 1;
    const scaledProgress = scrollProgress * maxIdx;
    const idx = Math.min(Math.floor(scaledProgress), maxIdx - 1);
    const subProgress = scaledProgress - idx;

    const wpA = WAYPOINTS[idx];
    const wpB = WAYPOINTS[Math.min(idx + 1, maxIdx)];

    // Interpolate target position and lookAt point into scratch vectors
    _targetPos.lerpVectors(wpA.pos, wpB.pos, subProgress);
    _targetLook.lerpVectors(wpA.look, wpB.look, subProgress);

    // Subtle parallax mouse tilt offset synchronized with face tilt
    _targetPos.x += mousePos.x * 0.35;
    _targetPos.y += mousePos.y * 0.25;

    // Frame-rate independent smooth exponential dampening (butter smooth on 60/120/144Hz)
    const lerpFactor = 1.0 - Math.exp(-7.0 * delta);
    camera.position.lerp(_targetPos, lerpFactor);
    currentLookAt.current.lerp(_targetLook, lerpFactor);
    camera.lookAt(currentLookAt.current);

    // Subtle 3D camera banking roll on cursor movement
    camera.rotation.z = -mousePos.x * 0.012;

    // Dynamic FOV interpolation
    if ('fov' in camera) {
      const perspectiveCam = camera as THREE.PerspectiveCamera;
      const targetFov = THREE.MathUtils.lerp(wpA.fov, wpB.fov, subProgress);
      if (Math.abs(perspectiveCam.fov - targetFov) > 0.01) {
        perspectiveCam.fov = THREE.MathUtils.lerp(perspectiveCam.fov, targetFov, lerpFactor);
        perspectiveCam.updateProjectionMatrix();
      }
    }
  });

  return null;
}

export default CameraRig;
