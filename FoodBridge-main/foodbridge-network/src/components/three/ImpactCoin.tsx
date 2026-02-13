import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ImpactCoin = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
  });

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[0.8, 0.8, 0.12, 32]} />
      <meshStandardMaterial
        color="#FFD700"
        metalness={0.9}
        roughness={0.1}
        emissive="#FFD700"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export default ImpactCoin;
