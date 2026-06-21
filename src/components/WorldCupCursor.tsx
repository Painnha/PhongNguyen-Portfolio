/**
 * WorldCupCursor.tsx
 *
 * An optimized interactive cursor component featuring a 3D rolling soccer ball
 * and a 2D grass particle trail.
 */

import React, { useEffect, useState, useRef, Suspense, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Define structure for a single grass particle
interface GrassParticle {
  id: string;
  x: number;
  y: number;
  color: string;
  rotation: number;
  targetX: number;
  targetY: number;
  targetRotation: number;
  width: number;
  height: number;
}

interface RollingBallProps {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  glowRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * 3D Sub-component that loads, scales, positions, and rolls the soccer ball
 */
function RollingBall({ mouseRef, glowRef }: RollingBallProps) {
  const ballGroupRef = useRef<THREE.Group>(null);
  const ballRef = useRef<THREE.Group>(null);
  const prevPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const damp2D = useRef({ x: 0, y: 0 });
  const isFirstFrame = useRef(true);

  // Load the soccer ball GLTF model from the public folder
  const { scene } = useGLTF('/soccer_ball.glb');

  // Clone scene to avoid instances sharing references
  const clonedScene = useMemo(() => {
    return scene.clone();
  }, [scene]);

  // Find model dimensions to calculate exact scaling
  const modelMaxDim = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    return Math.max(size.x, size.y, size.z) || 1;
  }, [clonedScene]);

  const { viewport, size: canvasSize } = useThree();

  // Adjust scale dynamically so the ball maintains a constant screen size of 48px
  useEffect(() => {
    if (!ballRef.current) return;
    const desiredDiameter3D = (48 / canvasSize.width) * viewport.width;
    const scaleFactor = desiredDiameter3D / modelMaxDim;
    ballRef.current.scale.setScalar(scaleFactor);
  }, [viewport.width, canvasSize.width, modelMaxDim]);

  useFrame((state, delta) => {
    if (!ballGroupRef.current || !ballRef.current) return;

    // Convert screen coordinates to 3D world coordinates on the Z = 0 plane
    const targetX = (mouseRef.current.x / window.innerWidth - 0.5) * state.viewport.width;
    const targetY = -(mouseRef.current.y / window.innerHeight - 0.5) * state.viewport.height;

    const currentPos = ballGroupRef.current.position;

    // Smoothly damp position to follow the mouse (frame-rate independent)
    currentPos.x = THREE.MathUtils.damp(currentPos.x, targetX, 15, delta);
    currentPos.y = THREE.MathUtils.damp(currentPos.y, targetY, 15, delta);
    currentPos.z = 0; // Lock to the Z=0 plane

    // Force update world matrices
    ballGroupRef.current.updateMatrixWorld();

    // Initialize 2D damping on first frame to prevent glow flying from (0,0)
    if (isFirstFrame.current && mouseRef.current.x !== 0) {
      damp2D.current.x = mouseRef.current.x;
      damp2D.current.y = mouseRef.current.y;
      isFirstFrame.current = false;
    }

    // Damp the 2D glow coordinates
    damp2D.current.x = THREE.MathUtils.damp(damp2D.current.x, mouseRef.current.x, 15, delta);
    damp2D.current.y = THREE.MathUtils.damp(damp2D.current.y, mouseRef.current.y, 15, delta);

    // Position the 2D glow div to follow the ball in screen space (in pixels)
    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${damp2D.current.x}px, ${damp2D.current.y}px, 0) translate3d(-50%, -50%, 0)`;
    }

    // Initialize prevPos on first movement to prevent initial rotation jump
    if (prevPos.current.lengthSq() === 0 && currentPos.lengthSq() !== 0) {
      prevPos.current.copy(currentPos);
      return;
    }

    // Calculate movement delta
    const dx = currentPos.x - prevPos.current.x;
    const dy = currentPos.y - prevPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0.0001) {
      // Radius of the ball in 3D units (48px diameter = 24px radius)
      const radius = (24 / state.size.width) * state.viewport.width;

      // Axis of rotation must be perpendicular to the 2D movement vector
      const rotationAxis = new THREE.Vector3(-dy, dx, 0).normalize();

      // Angular distance (angle = arc length / radius)
      const angle = distance / radius;

      // Rotate around the calculated axis in world space
      ballRef.current.rotateOnWorldAxis(rotationAxis, angle);
    }

    // Keep track of the current position
    prevPos.current.copy(currentPos);
  });

  const radius = (24 / canvasSize.width) * viewport.width;

  return (
    <group ref={ballGroupRef}>
      {/* Tilt group to give dynamic perspective (isometric look) */}
      <group rotation={[Math.PI / 8, 0, 0]}>
        <primitive ref={ballRef} object={clonedScene} />
      </group>
      {/* ContactShadows handles all shadow rendering (highly optimized, no WebGL shadow maps required) */}
      <ContactShadows
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -radius - 0.02]}
        opacity={0.8}
        scale={2.5}
        blur={1.5}
        far={10}
        color="#000000"
      />
    </group>
  );
}

/**
 * Memoized 3D Canvas wrapper component to prevent heavy virtual DOM diffing 
 * on every single particle state update (which triggers on mousemove)
 */
const SoccerBallCanvas = React.memo(({ mouseRef, glowRef }: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  glowRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 15 }}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.8}
      />

      <Suspense fallback={null}>
        <RollingBall mouseRef={mouseRef} glowRef={glowRef} />
      </Suspense>
    </Canvas>
  );
});

SoccerBallCanvas.displayName = 'SoccerBallCanvas';

/**
 * Main World Cup Cursor component
 */
export default function WorldCupCursor() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [particles, setParticles] = useState<GrassParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastSpawnPos = useRef({ x: 0, y: 0 });
  const hasSpawnedFirst = useRef(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  // 1. Device detection (default active on desktop, default disabled on mobile/touch)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);
    setIsEnabled(mediaQuery.matches); // default enabled on desktop, disabled on mobile

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      setIsEnabled(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  // 2. Hide default cursor globally on active desktop sessions
  useEffect(() => {
    if (!isDesktop || !isEnabled) {
      const el = document.getElementById('world-cup-cursor-hide-style');
      if (el) {
        el.parentNode?.removeChild(el);
      }
      return;
    }

    const styleEl = document.createElement('style');
    styleEl.id = 'world-cup-cursor-hide-style';
    styleEl.innerHTML = `
      body, body *, a, button, [role="button"], input, select, textarea {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      const el = document.getElementById('world-cup-cursor-hide-style');
      if (el) {
        el.parentNode?.removeChild(el);
      }
    };
  }, [isDesktop, isEnabled]);

  // 3. Mouse and touch event tracker, and grass particle spawn logic
  useEffect(() => {
    if (!isEnabled) return;

    const spawnParticle = (x: number, y: number) => {
      const id = Math.random().toString(36).substring(2, 9);
      const colors = ['bg-green-400', 'bg-green-500', 'bg-green-600'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const rotation = Math.random() * 90 - 45; // Initial rotation -45 to 45 deg

      // Determine randomized ending properties for Framer Motion animation
      const targetX = Math.random() * 50 - 25; // x offset random(-25, 25)
      const targetY = Math.random() * 50 - 25; // y offset random(-25, 25)
      const targetRotation = rotation + (Math.random() * 60 - 30); // Rotate more/less during fall

      // Blade of grass size variation
      const width = Math.random() * 3 + 2; // 2px to 5px
      const height = Math.random() * 8 + 6; // 6px to 14px

      const newParticle: GrassParticle = {
        id,
        x,
        y,
        color,
        rotation,
        targetX,
        targetY,
        targetRotation,
        width,
        height,
      };

      setParticles((prev) => [...prev, newParticle]);

      // Auto-garbage collect particle after exactly 400ms (reduced from 600ms)
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 400);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseRef.current = { x: clientX, y: clientY };

      if (!hasSpawnedFirst.current) {
        spawnParticle(clientX, clientY);
        lastSpawnPos.current = { x: clientX, y: clientY };
        hasSpawnedFirst.current = true;
        return;
      }

      // Check distance from last spawn point using Pythagorean theorem
      const dx = clientX - lastSpawnPos.current.x;
      const dy = clientY - lastSpawnPos.current.y;
      const distance = Math.hypot(dx, dy);

      // Throttle particle spawning (at least 30px between grass particles - up from 15px)
      if (distance >= 30) {
        spawnParticle(clientX, clientY);
        lastSpawnPos.current = { x: clientX, y: clientY };
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;
      mouseRef.current = { x: clientX, y: clientY };
      spawnParticle(clientX, clientY);
      lastSpawnPos.current = { x: clientX, y: clientY };
      hasSpawnedFirst.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;
      mouseRef.current = { x: clientX, y: clientY };

      if (!hasSpawnedFirst.current) {
        spawnParticle(clientX, clientY);
        lastSpawnPos.current = { x: clientX, y: clientY };
        hasSpawnedFirst.current = true;
        return;
      }

      const dx = clientX - lastSpawnPos.current.x;
      const dy = clientY - lastSpawnPos.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance >= 30) {
        spawnParticle(clientX, clientY);
        lastSpawnPos.current = { x: clientX, y: clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isEnabled]);

  // Pre-load the GLTF asset so it's ready when mounted
  useMemo(() => {
    useGLTF.preload('/soccer_ball.glb');
  }, []);

  if (isDesktop === null) return null;

  return (
    <>
      {/* Toggle Button in bottom-right */}
      <motion.button
        onClick={() => setIsEnabled(!isEnabled)}
        animate={isEnabled ? { y: [0, -4, 0] } : { y: 0 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`fixed bottom-24 right-8 p-3 rounded-full border shadow-lg transition-all duration-300 z-50 hover:scale-110 cursor-pointer flex items-center justify-center ${
          isEnabled
            ? 'bg-accent-warm/10 border-accent-warm/30 text-accent-warm hover:bg-accent-warm/20 shadow-accent-warm/10'
            : 'bg-bg-card/80 border-border/80 text-text-secondary hover:text-text-primary hover:bg-bg-card'
        }`}
        title={isEnabled ? "Tắt hiệu ứng 3D" : "Bật hiệu ứng 3D"}
      >
        {isEnabled ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex items-center justify-center w-5 h-5"
          >
            <img src="/Ball_Icon.png" alt="World Cup Icon" className="w-full h-full object-contain" />
          </motion.div>
        ) : (
          <div className="flex items-center justify-center w-5 h-5 opacity-40 grayscale relative">
            <img src="/Ball_Icon.png" alt="World Cup Icon Disabled" className="w-full h-full object-contain" />
            <div className="absolute w-[120%] h-[2px] bg-current rotate-45 rounded" />
          </div>
        )}
      </motion.button>

      {isEnabled && (
        <>
          {/* 2D Grass Particle Overlay */}
          <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
            <AnimatePresence>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  style={{
                    position: 'absolute',
                    left: p.x,
                    top: p.y,
                    width: p.width,
                    height: p.height,
                    transformOrigin: 'bottom center',
                  }}
                  className={`${p.color} rounded-t-full pointer-events-none`}
                  initial={{
                    x: -p.width / 2,
                    y: -p.height / 2,
                    scale: 1,
                    opacity: 1,
                    rotate: p.rotation,
                  }}
                  animate={{
                    x: -p.width / 2 + p.targetX,
                    y: -p.height / 2 + p.targetY,
                    scale: 0,
                    opacity: 0,
                    rotate: p.targetRotation,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* 2D Glow Layer (Esports Glow Aura) */}
          <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
            <div
              ref={glowRef}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '64px',
                height: '64px',
                transform: 'translate3d(-100px, -100px, 0) translate3d(-50%, -50%, 0)',
                willChange: 'transform',
              }}
              className="bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_70%)] rounded-full"
            />
          </div>

          {/* Optimized Memoized 3D Canvas Overlay */}
          <SoccerBallCanvas mouseRef={mouseRef} glowRef={glowRef} />
        </>
      )}
    </>
  );
}
