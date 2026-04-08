"use client";

import {
  ContactShadows,
  Environment,
  MeshReflectorMaterial,
  OrbitControls
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { PerspectiveCamera } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { HouseModel } from "@/components/HouseModel";
import type { RoofColor, RoofMaterialId, RoofShapeId } from "@/types/roof";

type RoofSceneProps = {
  material: RoofMaterialId;
  color: RoofColor;
  shape: RoofShapeId;
};

type CameraPreset = {
  fov: number;
  maxDistance: number;
  minDistance: number;
  position: [number, number, number];
  target: [number, number, number];
};

const cameraPresets = {
  desktop: {
    fov: 33,
    maxDistance: 10.6,
    minDistance: 3.95,
    position: [5.45, 3.55, 5.95],
    target: [0, 0.82, 0]
  },
  tablet: {
    fov: 36,
    maxDistance: 11.4,
    minDistance: 4.65,
    position: [6.25, 3.85, 6.75],
    target: [0, 0.78, 0]
  },
  mobile: {
    fov: 39,
    maxDistance: 12.4,
    minDistance: 5.45,
    position: [6.85, 4.1, 7.35],
    target: [0, 0.72, 0]
  }
} satisfies Record<string, CameraPreset>;

export function RoofScene({ material, color, shape }: RoofSceneProps) {
  return (
    <div className="relative h-[430px] overflow-hidden rounded-md border border-white/70 bg-[linear-gradient(145deg,#f8fafb_0%,#dfe8ee_42%,#bdc9d1_100%)] shadow-[0_34px_110px_rgba(17,20,23,0.22)] sm:h-[520px] lg:h-[620px] xl:h-[660px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_46%_18%,rgba(255,255,255,0.98),rgba(255,255,255,0)_31%),radial-gradient(circle_at_72%_74%,rgba(17,20,23,0.18),rgba(17,20,23,0)_38%),linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(17,20,23,0.16)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-[linear-gradient(180deg,rgba(17,20,23,0)_0%,rgba(17,20,23,0.16)_100%)]" />
      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-md border border-white/80 bg-white/80 px-3 py-2 text-xs font-medium text-slate shadow-soft backdrop-blur sm:left-6 sm:top-6">
        Потяните модель, чтобы повернуть
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden rounded-md border border-white/70 bg-white/70 px-3 py-2 text-xs text-slate shadow-soft backdrop-blur sm:block">
        3D-просмотр: форма, цвет и материал применяются сразу
      </div>

      <Canvas
        camera={{ position: cameraPresets.desktop.position, fov: cameraPresets.desktop.fov }}
        className="absolute inset-0"
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <Suspense fallback={null}>
          <color args={["#dfe8ee"]} attach="background" />
          <fog attach="fog" args={["#dfe8ee", 7.6, 16]} />
          <ambientLight intensity={0.55} />
          <hemisphereLight
            args={["#ffffff", "#7b8790", 1.2]}
            position={[0, 4, 0]}
          />
          <directionalLight
            castShadow
            intensity={3.4}
            position={[4.8, 8.2, 5.2]}
            shadow-bias={-0.0003}
            shadow-camera-bottom={-6}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-mapSize-height={2048}
            shadow-mapSize-width={2048}
          />
          <spotLight
            angle={0.36}
            castShadow
            intensity={2.1}
            penumbra={0.82}
            position={[-5.8, 5.8, 4.6]}
          />
          <spotLight
            angle={0.5}
            intensity={0.72}
            penumbra={0.9}
            position={[4.2, 3.4, -5.2]}
          />
          <HouseModel color={color} material={material} shape={shape} />
          <mesh receiveShadow position={[0, -1.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[14, 14]} />
            <MeshReflectorMaterial
              blur={[360, 120]}
              color="#d7e0e6"
              depthScale={0.18}
              metalness={0.08}
              mirror={0.18}
              mixBlur={1}
              mixStrength={0.55}
              roughness={0.72}
            />
          </mesh>
          <ContactShadows
            blur={2.35}
            far={8}
            opacity={0.42}
            position={[0, -1.12, 0]}
            scale={7.4}
          />
          <Environment preset="warehouse" environmentIntensity={0.82} />
          <ResponsiveCameraControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

function ResponsiveCameraControls() {
  const { camera, size } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const appliedPresetKey = useRef<string | null>(null);

  const presetKey = useMemo(() => {
    if (size.width < 640) {
      return "mobile";
    }

    if (size.width < 1024) {
      return "tablet";
    }

    return "desktop";
  }, [size.width]);
  const preset = cameraPresets[presetKey];

  useEffect(() => {
    const perspectiveCamera = camera as PerspectiveCamera;
    const controls = controlsRef.current;

    if (appliedPresetKey.current === presetKey) {
      return;
    }

    perspectiveCamera.position.set(...preset.position);
    perspectiveCamera.fov = preset.fov;
    perspectiveCamera.updateProjectionMatrix();

    if (controls) {
      controls.target.set(...preset.target);
      controls.minDistance = preset.minDistance;
      controls.maxDistance = preset.maxDistance;
      controls.update();
    }

    appliedPresetKey.current = presetKey;
  }, [camera, preset, presetKey]);

  return (
    <OrbitControls
      ref={controlsRef}
      dampingFactor={0.08}
      enableDamping
      enablePan={false}
      enableZoom
      maxDistance={preset.maxDistance}
      maxPolarAngle={Math.PI / 2.1}
      minDistance={preset.minDistance}
      minPolarAngle={Math.PI / 4.8}
      target={preset.target}
      zoomSpeed={0.78}
    />
  );
}
