import { Canvas } from "@react-three/fiber";
import { ReactNode, Suspense } from "react";

const SceneWrapper = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneWrapper;
