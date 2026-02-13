import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Globe = () => {
  const globeRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Create dot positions on sphere surface
  const dotPositions = useMemo(() => {
    const positions: number[] = [];
    const count = 2000;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = 2 * Math.cos(theta) * Math.sin(phi);
      const y = 2 * Math.sin(theta) * Math.sin(phi);
      const z = 2 * Math.cos(phi);
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, []);

  // Orbit ring positions
  const orbitNodes = useMemo(() => {
    const nodes: [number, number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      nodes.push([
        2.8 * Math.cos(angle),
        (Math.random() - 0.5) * 1.5,
        2.8 * Math.sin(angle),
      ]);
    }
    return nodes;
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Dot sphere */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dotPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#00FFB2"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[2.8, 0.005, 16, 100]} />
        <meshBasicMaterial color="#00FFB2" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3, 0.005, 16, 100]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.2} />
      </mesh>

      {/* Pulsing nodes */}
      {orbitNodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#00FFB2" : "#00D9FF"} />
        </mesh>
      ))}
    </group>
  );
};

export default Globe;
