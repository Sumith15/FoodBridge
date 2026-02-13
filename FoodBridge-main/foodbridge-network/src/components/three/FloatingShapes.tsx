import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingShape = ({ position, geometry, color, speed = 1 }: {
  position: [number, number, number];
  geometry: "box" | "tetra" | "icosa";
  color: string;
  speed?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2 * speed;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      {geometry === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {geometry === "tetra" && <tetrahedronGeometry args={[0.2]} />}
      {geometry === "icosa" && <icosahedronGeometry args={[0.2]} />}
      <meshBasicMaterial color={color} transparent opacity={0.6} wireframe />
    </mesh>
  );
};

const FloatingShapes = () => {
  return (
    <group>
      <FloatingShape position={[-3, 1, -2]} geometry="box" color="#00FFB2" speed={0.8} />
      <FloatingShape position={[3.5, -1, -1]} geometry="tetra" color="#00D9FF" speed={1.2} />
      <FloatingShape position={[-2, -2, -3]} geometry="icosa" color="#00FFB2" speed={0.6} />
      <FloatingShape position={[2, 2, -2]} geometry="box" color="#00D9FF" speed={1} />
      <FloatingShape position={[0, 3, -4]} geometry="tetra" color="#00FFB2" speed={0.9} />
    </group>
  );
};

export default FloatingShapes;
