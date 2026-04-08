import { Edges, RoundedBox } from "@react-three/drei";
import { useMemo } from "react";
import type { ReactNode } from "react";
import { BufferGeometry, DoubleSide, Float32BufferAttribute } from "three";
import type { RoofColor, RoofMaterialId, RoofShapeId } from "@/types/roof";

type HouseModelProps = {
  color: RoofColor;
  material: RoofMaterialId;
  shape: RoofShapeId;
};

const houseWidth = 4.8;
const houseDepth = 3.6;
const wallHeight = 2.25;
const roofDepth = 4.12;
const roofWidth = 5.36;

export function HouseModel({ color, material, shape }: HouseModelProps) {
  return (
    <group position={[0, -0.7, 0]} rotation={[0, -0.5, 0]} scale={1.16}>
      <Foundation />
      <ModernHouse />
      <Roof color={color} material={material} shape={shape} />
      <LandscapePad />
    </group>
  );
}

function Foundation() {
  return (
    <group position={[0, -0.08, 0]}>
      <RoundedBox args={[5.8, 0.24, 4.55]} radius={0.08} smoothness={5} receiveShadow>
        <meshStandardMaterial color="#cfd7dd" roughness={0.66} metalness={0.12} />
      </RoundedBox>
      <RoundedBox args={[6.5, 0.08, 5.25]} position={[0, -0.16, 0]} radius={0.08} smoothness={5} receiveShadow>
        <meshStandardMaterial color="#aebac3" roughness={0.78} metalness={0.08} />
      </RoundedBox>
    </group>
  );
}

function LandscapePad() {
  return (
    <group position={[0, -0.25, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <circleGeometry args={[4.4, 80]} />
        <meshStandardMaterial color="#d8e1e7" roughness={0.82} metalness={0.05} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0.95, -0.035, 2.05]}>
        <planeGeometry args={[1.2, 2.4]} />
        <meshStandardMaterial color="#9ba8b1" roughness={0.74} metalness={0.12} />
      </mesh>
    </group>
  );
}

function ModernHouse() {
  return (
    <group>
      <RoundedBox args={[houseWidth, wallHeight, houseDepth]} position={[0, wallHeight / 2, 0]} radius={0.05} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color="#f4f7f8" roughness={0.58} metalness={0.04} />
      </RoundedBox>
      <mesh position={[0, wallHeight + 0.02, 0]} receiveShadow>
        <boxGeometry args={[houseWidth + 0.08, 0.08, houseDepth + 0.08]} />
        <meshStandardMaterial color="#bcc7cf" roughness={0.62} metalness={0.1} />
      </mesh>

      <FacadePanel position={[-1.53, 1.12, 1.83]} width={1.12} height={1.14} />
      <FacadePanel position={[0.08, 1.16, 1.84]} width={0.88} height={1.52} />
      <FacadePanel position={[1.45, 1.12, 1.83]} width={1.05} height={1.14} />

      <mesh position={[-1.53, 1.12, 1.91]} castShadow>
        <boxGeometry args={[1.02, 0.94, 0.08]} />
        <WindowMaterial />
      </mesh>
      <mesh position={[1.45, 1.12, 1.91]} castShadow>
        <boxGeometry args={[0.95, 0.94, 0.08]} />
        <WindowMaterial />
      </mesh>
      <mesh position={[0.08, 0.96, 1.92]} castShadow>
        <boxGeometry args={[0.72, 1.32, 0.09]} />
        <meshStandardMaterial color="#20262c" roughness={0.42} metalness={0.34} />
      </mesh>
      <mesh position={[0.39, 1.02, 1.98]} castShadow>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#d2a66f" roughness={0.3} metalness={0.48} />
      </mesh>

      <mesh position={[-2.46, 1.28, -0.78]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[1.28, 0.92, 0.08]} />
        <WindowMaterial />
      </mesh>
      <mesh position={[2.46, 1.28, 0.78]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[1.28, 0.92, 0.08]} />
        <WindowMaterial />
      </mesh>
    </group>
  );
}

function WindowMaterial() {
  return (
    <meshPhysicalMaterial
      color="#9fb5c4"
      metalness={0.12}
      opacity={0.72}
      roughness={0.12}
      transmission={0.14}
      transparent
    />
  );
}

function FacadePanel({
  position,
  width,
  height
}: {
  position: [number, number, number];
  width: number;
  height: number;
}) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[width + 0.16, height + 0.16, 0.05]} />
      <meshStandardMaterial color="#dce4e9" roughness={0.7} metalness={0.06} />
    </mesh>
  );
}

function Roof({ color, material, shape }: HouseModelProps) {
  return (
    <group>
      {shape === "gable" ? (
        <GableRoof color={color} material={material} />
      ) : null}
      {shape === "shed" ? <ShedRoof color={color} material={material} /> : null}
      {shape === "hip" ? <HipRoof color={color} material={material} /> : null}
      <mesh position={[1.58, 2.82, -1.02]} castShadow>
        <boxGeometry args={[0.34, 0.86, 0.34]} />
        <meshStandardMaterial color="#42494f" roughness={0.62} metalness={0.12} />
      </mesh>
    </group>
  );
}

function RoofSkin({ color, material }: { color: RoofColor; material: RoofMaterialId }) {
  const roughness =
    material === "faltznastil" ? 0.28 : material === "metal-tile" ? 0.38 : 0.31;
  const metalness =
    material === "faltznastil" ? 0.68 : material === "metal-tile" ? 0.5 : 0.62;

  return (
    <meshPhysicalMaterial
      clearcoat={0.38}
      clearcoatRoughness={0.22}
      color={color.value}
      envMapIntensity={1.18}
      metalness={metalness}
      roughness={roughness}
      side={DoubleSide}
    />
  );
}

function GableRoof({
  color,
  material
}: {
  color: RoofColor;
  material: RoofMaterialId;
}) {
  const rise = 1.04;
  const half = roofWidth / 2;
  const slopeLength = Math.sqrt(half * half + rise * rise);
  const angle = Math.atan(rise / half);

  return (
    <group>
      <RoofPanel position={[-half / 2, wallHeight + rise / 2, 0]} rotation={[0, 0, angle]} size={[slopeLength, 0.1, roofDepth]} material={material}>
        <RoofSkin color={color} material={material} />
      </RoofPanel>
      <RoofPanel position={[half / 2, wallHeight + rise / 2, 0]} rotation={[0, 0, -angle]} size={[slopeLength, 0.1, roofDepth]} material={material}>
        <RoofSkin color={color} material={material} />
      </RoofPanel>
      <mesh position={[0, wallHeight + rise + 0.05, 0]} castShadow>
        <boxGeometry args={[0.16, 0.16, roofDepth + 0.06]} />
        <RoofSkin color={color} material={material} />
      </mesh>
    </group>
  );
}

function ShedRoof({
  color,
  material
}: {
  color: RoofColor;
  material: RoofMaterialId;
}) {
  const rise = 0.82;
  const length = Math.sqrt(roofWidth * roofWidth + rise * rise);
  const angle = Math.atan(rise / roofWidth);

  return (
    <group>
      <RoofPanel position={[0, wallHeight + 0.42, 0]} rotation={[0, 0, -angle]} size={[length, 0.12, roofDepth]} material={material}>
        <RoofSkin color={color} material={material} />
      </RoofPanel>
      <mesh position={[-2.48, wallHeight + 0.84, 0]} castShadow>
        <boxGeometry args={[0.12, 0.18, roofDepth + 0.08]} />
        <RoofSkin color={color} material={material} />
      </mesh>
    </group>
  );
}

function HipRoof({
  color,
  material
}: {
  color: RoofColor;
  material: RoofMaterialId;
}) {
  const geometry = useMemo(() => createHipRoofGeometry(), []);

  return (
    <group>
      <mesh geometry={geometry} castShadow receiveShadow>
        <RoofSkin color={color} material={material} />
        <Edges color="#ffffff" />
      </mesh>
      <HipRibs material={material} />
    </group>
  );
}

function RoofPanel({
  children,
  position,
  rotation,
  size,
  material
}: {
  children: ReactNode;
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number, number];
  material: RoofMaterialId;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        {children}
        <Edges color="#ffffff" />
      </mesh>
      <SurfaceRibs material={material} panelLength={size[0]} panelDepth={size[2]} />
    </group>
  );
}

function SurfaceRibs({
  material,
  panelLength,
  panelDepth
}: {
  material: RoofMaterialId;
  panelLength: number;
  panelDepth: number;
}) {
  if (material === "profnastil") {
    return <C21Profile panelDepth={panelDepth} panelLength={panelLength} />;
  }

  const count = material === "faltznastil" ? 6 : 9;
  const ribs = Array.from({ length: count }, (_, index) => index);

  return (
    <group position={[0, 0.075, 0]}>
      {ribs.map((rib) => {
        const z = -panelDepth / 2 + ((rib + 1) * panelDepth) / (count + 1);
        const height = material === "metal-tile" ? 0.018 : 0.045;
        const width = material === "faltznastil" ? 0.04 : 0.025;
        return (
          <mesh key={rib} position={[0, 0, z]} castShadow>
            <boxGeometry args={[panelLength * 0.92, height, width]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.34} roughness={0.24} metalness={0.34} />
          </mesh>
        );
      })}

      {material === "metal-tile"
        ? [-0.32, 0.32].map((offset) => (
            <mesh key={offset} position={[offset, 0.012, 0]} castShadow>
              <boxGeometry args={[0.028, 0.028, panelDepth * 0.9]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.26} roughness={0.28} metalness={0.24} />
            </mesh>
          ))
        : null}
    </group>
  );
}

function C21Profile({
  panelLength,
  panelDepth
}: {
  panelLength: number;
  panelDepth: number;
}) {
  const waves = Array.from({ length: 9 }, (_, index) => index);

  return (
    <group position={[0, 0.076, 0]}>
      {waves.map((wave) => {
        const z = -panelDepth / 2 + ((wave + 1) * panelDepth) / (waves.length + 1);

        return (
          <group key={wave}>
            <mesh position={[0, 0.018, z]} castShadow>
              <boxGeometry args={[panelLength * 0.93, 0.07, 0.058]} />
              <meshStandardMaterial color="#ffffff" metalness={0.38} opacity={0.38} roughness={0.22} transparent />
            </mesh>
            {[-0.074, 0.074].map((offset) => (
              <mesh key={offset} position={[0, -0.003, z + offset]} castShadow>
                <boxGeometry args={[panelLength * 0.91, 0.035, 0.032]} />
                <meshStandardMaterial color="#ffffff" metalness={0.3} opacity={0.22} roughness={0.3} transparent />
              </mesh>
            ))}
            {[-0.142, 0.142].map((offset) => (
              <mesh key={offset} position={[0, -0.038, z + offset]}>
                <boxGeometry args={[panelLength * 0.9, 0.012, 0.018]} />
                <meshStandardMaterial color="#0f1418" metalness={0.2} opacity={0.16} roughness={0.5} transparent />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}

function HipRibs({ material }: { material: RoofMaterialId }) {
  const spacing = material === "faltznastil" ? 0.72 : 0.42;
  const ribs = Array.from({ length: 9 }, (_, index) => -1.68 + index * spacing).filter(
    (z) => Math.abs(z) < roofDepth / 2 - 0.2
  );

  return (
    <group>
      {ribs.map((z) => (
        <mesh key={z} position={[0, wallHeight + 0.72, z]} castShadow>
          <boxGeometry args={[3.7, 0.035, 0.035]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} roughness={0.28} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function createHipRoofGeometry() {
  const w = roofWidth / 2;
  const d = roofDepth / 2;
  const eave = wallHeight + 0.02;
  const ridge = wallHeight + 1.05;
  const ridgeDepth = 1.18;

  const vertices = [
    -w, eave, -d, w, eave, -d, 0.86, ridge, -ridgeDepth, -0.86, ridge, -ridgeDepth,
    w, eave, d, -w, eave, d, -0.86, ridge, ridgeDepth, 0.86, ridge, ridgeDepth,
    -w, eave, -d, -0.86, ridge, -ridgeDepth, -0.86, ridge, ridgeDepth, -w, eave, d,
    w, eave, -d, w, eave, d, 0.86, ridge, ridgeDepth, 0.86, ridge, -ridgeDepth,
    -0.86, ridge, -ridgeDepth, 0.86, ridge, -ridgeDepth, 0.86, ridge, ridgeDepth, -0.86, ridge, ridgeDepth
  ];

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setIndex([
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19
  ]);
  geometry.computeVertexNormals();
  return geometry;
}
